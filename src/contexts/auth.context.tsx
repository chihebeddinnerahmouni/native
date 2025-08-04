import React, { createContext, useState, useContext, useEffect } from "react";
import {
  AxiosInstance,
  ERoute,
  getToken,
  removeToken,
  setToken,
} from "../utils";
import { RefreshTokenResponse, User } from "../backend/casaikos-api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (data: RefreshTokenResponse) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
  isUserAuthenticated?: boolean;
  isLoading: boolean;
  unLinkEmail: () => void;
}

const logoutRequest = async () => {
  const token = await getToken();
  if (token) {
    AxiosInstance.auth
      .authControllerLogout({
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.error("Logout request failed:", error);
      });
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
  verifyToken: async () => {},
  isUserAuthenticated: undefined,
  isLoading: true,
  unLinkEmail: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const token = await getToken();
      if (token) {
        await AxiosInstance.auth
          .authControllerVerifyToken()
          .then((response) => {
            setUser(response.data);
            setIsUserAuthenticated(true);
          })
          .catch(() => {
            setUser(null);
            setIsUserAuthenticated(false);
          });
      } else {
        setUser(null);
        setIsUserAuthenticated(false);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setUser(null);
      setIsUserAuthenticated(false);
    }
    setIsLoading(false);
  };

  const login = async (data: RefreshTokenResponse) => {
    await setToken(data.accessToken);
    await verifyToken();
    console.log("User logged in:");
    // navigation.navigate(ERoute.CONVERSATIONS_LIST);
  };

  const logout = async () => {
    await logoutRequest();
    await removeToken();
    setUser(null);
    setIsUserAuthenticated(false);
  };

  const unLinkEmail = () => {
    setUser((prev) => {
      if (prev)
        return {
          ...prev,
          emailLinked: false,
        };
      else return null;
    });
  };

  // Initialize auth state on app start
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        verifyToken,
        isUserAuthenticated,
        isLoading,
        unLinkEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
