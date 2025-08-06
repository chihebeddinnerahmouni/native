import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api-query/queryClient";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./contexts/auth.context";
import { SocketProvider } from "./contexts/socket.context";
import { RootNavigator } from "./navigation";
import { ESocketRefreshModule, EWebsocketType } from "./backend/casaikos-api";
import { socket } from "./utils";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.ttf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.ttf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.ttf"),
    "Satoshi-Light": require("../assets/fonts/Satoshi-Light.ttf"),
  });
  const { verifyToken, user } = useAuth();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const connectHandler = () => {
      if (user) {
        socket?.emit("register", {
          userId: user._id,
          companyId: user.company._id,
        });
      }
    };

    const dataChangedHandler = (data: {
      module: ESocketRefreshModule;
      moduleId?: string;
    }) => {
      queryClient.invalidateQueries({ queryKey: [data.module] });

      if (
        data.module === ESocketRefreshModule.COMPANIES &&
        data.moduleId === user?.company._id
      ) {
        verifyToken();
      }

      if (
        data.module === ESocketRefreshModule.USERS &&
        data.moduleId === user?.company._id &&
        user?._id === data.moduleId
      ) {
        verifyToken();
      }
    };

    if (user) {
      connectHandler();
    }

    socket?.on(EWebsocketType.Connect, connectHandler);
    socket?.on(EWebsocketType.REFRESH, dataChangedHandler);

    return () => {
      socket?.off(EWebsocketType.Connect, connectHandler);
      socket?.off(EWebsocketType.REFRESH, dataChangedHandler);
    };
  }, [user, verifyToken]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <Toast />
          </SafeAreaProvider>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
