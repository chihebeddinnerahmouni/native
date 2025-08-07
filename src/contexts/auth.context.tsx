import React, { createContext, useState, useContext, useEffect } from "react";
import {
  AxiosInstance,
  getToken,
  removeToken,
  setToken,
  socketManager,
} from "../utils";
import {
  RefreshTokenResponse,
  User,
  EWebsocketType,
  ESocketRefreshModule,
} from "../backend/casaikos-api";
import { queryClient } from "../api-query/queryClient";

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

  useEffect(() => {
    const socket = socketManager.getSocket();

    if (socket && user) {
      const handleConnect = () => {
        socketManager.emit("register", {
          userId: user._id,
          companyId: user.company._id,
        });
      };

      const handleDataChanged = (data: {
        module: ESocketRefreshModule;
        moduleId?: string;
      }) => {
        queryClient.invalidateQueries({ queryKey: [data.module] });

        if (
          data.module === ESocketRefreshModule.COMPANIES &&
          data.moduleId === user.company._id
        ) {
          verifyToken();
        }

        if (
          data.module === ESocketRefreshModule.USERS &&
          data.moduleId === user._id
        ) {
          verifyToken();
        }
      };

      if (socket.connected) {
        handleConnect();
      }

      socketManager.on(EWebsocketType.Connect, handleConnect);
      socketManager.on(EWebsocketType.REFRESH, handleDataChanged);

      return () => {
        socketManager.off(EWebsocketType.Connect, handleConnect);
        socketManager.off(EWebsocketType.REFRESH, handleDataChanged);
      };
    }
  }, [user]);

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
