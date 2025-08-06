import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api-query/queryClient";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./contexts/auth.context";
import { SocketProvider } from "./contexts/socket.context";
import { RootNavigator } from "./navigation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.ttf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.ttf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.ttf"),
    "Satoshi-Light": require("../assets/fonts/Satoshi-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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
