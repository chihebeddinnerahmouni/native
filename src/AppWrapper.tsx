import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { RootNavigator } from "./navigation";
import { useAuth } from "./contexts/auth.context";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { socketManager } from "./utils";
import { ESocketRefreshModule, EWebsocketType } from "./backend/casaikos-api";
import { queryClient } from "./api-query/queryClient";

export const AppWrapper: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.ttf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.ttf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.ttf"),
    "Satoshi-Light": require("../assets/fonts/Satoshi-Light.ttf"),
  });

  const { isLoading, user, verifyToken } = useAuth();

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

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

      socketManager.on(EWebsocketType.CONNECT, handleConnect);
      socketManager.on(EWebsocketType.REFRESH, handleDataChanged);

      return () => {
        socketManager.off(EWebsocketType.CONNECT, handleConnect);
        socketManager.off(EWebsocketType.REFRESH, handleDataChanged);
      };
    }
  }, [user, verifyToken]);

  if (!fontsLoaded || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};
