/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from "axios";
import { Api } from "../backend/casaikos-api";
import Toast from "react-native-toast-message";
import { getToken, removeToken, setToken } from "./token.utils";

export interface AxiosInstanceErrorResponse {
  status: number;
  message: string;
}

const AxiosInstance = new Api({
  baseURL: process.env.REACT_APP_API_URL,
});

let csrfToken: string | null = null;
let isRefreshing = false;
let isFetchingCSRF = false;
let pendingRequests: CallableFunction[] = [];

const onRefreshed = (token: string) => {
  pendingRequests.forEach((callback) => callback(token));
  pendingRequests = [];
};

const addPendingRequest = (callback: CallableFunction) => {
  pendingRequests.push(callback);
};

const refreshToken = async () => {
  const response = await AxiosInstance.instance.post("/auth/refresh", {});
  const { accessToken } = response.data;
  setToken(accessToken);
  return accessToken;
};

const fetchCsrfToken = async () => {
  isFetchingCSRF = true;

  const response = await AxiosInstance.instance.get("/auth/csrf-token", {
    withCredentials: true,
  });
  csrfToken = response.data.csrfToken;

  isFetchingCSRF = false;

  onRefreshed(csrfToken as string);
};

AxiosInstance.instance.interceptors.request.use(
  async (config) => {
    // Skip interceptor for CSRF request
    if (config.url === "/auth/csrf-token") return config;

    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["ngrok-skip-browser-warning"] = "skip-browser-warning";
    config.withCredentials = true; // Use cookies

    if (!csrfToken && !isFetchingCSRF) {
      await fetchCsrfToken();
    }

    if (isFetchingCSRF) {
      return new Promise((resolve) => {
        addPendingRequest((csrfToken: string) => {
          config.headers["X-CSRF-TOKEN"] = csrfToken;
          resolve(config);
        });
      });
    }

    config.headers["X-CSRF-TOKEN"] = csrfToken;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

AxiosInstance.instance.interceptors.response.use(
  (response: AxiosResponse) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  async (error: AxiosError) => {
    let errorResponse: AxiosInstanceErrorResponse;

    switch (error?.response?.status) {
      case 400: {
        errorResponse = {
          status: 400,
          message:
            (error?.response?.data as any)?.message ??
            (error?.response?.data as any) ??
            "Something went wrong",
        };
        break;
      }
      case 401: {
        const originalRequest = error.config!;

        // Normal unauthorized request on login page
        if (originalRequest.url === "/auth/signin") {
          errorResponse = {
            status: 401,
            message: "Wrong Email or Password please check your credentials",
          };
          break;
        } else if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newToken = await refreshToken();
            AxiosInstance.instance.defaults.headers.common["Authorization"] =
              `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            onRefreshed(newToken);
            return AxiosInstance.instance(originalRequest);
          } catch (refreshError) {
            removeToken();
            // window.location.href = "/login";
          } finally {
            isRefreshing = false;
          }
        } else if (isRefreshing && originalRequest.url === "/auth/refresh") {
          errorResponse = {
            status: 401,
            message: "Unable to refresh token. Redirecting to login.",
          };
          break;
        }

        // If already refreshing, wait until it's done
        return new Promise((resolve) => {
          addPendingRequest((newToken: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(AxiosInstance.instance(originalRequest));
          });
        });
      }
      case 403: {
        const messageError =
          (error?.response?.data as any)?.message ??
          "Access denied! You are not authorized.";
        errorResponse = {
          status: 403,
          message: messageError,
        };
        break;
      }
      case 429: {
        const messageError =
          "Too many requests, please try again later or contact admin.";
        Toast.show({
          type: "error",
          text1: "Error",
          text2: messageError,
        });
        errorResponse = {
          status: 400,
          message: messageError,
        };
        break;
      }
      case 500: {
        errorResponse = {
          status: 500,
          message: "Something went wrong",
        };
        break;
      }
      default: {
        errorResponse = {
          status: error?.response?.status ?? 0,
          message: "Unknown error",
        };
        break;
      }
    }

    return new Promise((_, reject) => {
      reject(errorResponse);
    });
  }
);

export { AxiosInstance };
