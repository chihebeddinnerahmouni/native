import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api-query/queryClient";
import { AuthProvider } from "./contexts/auth.context";
import { AppWrapper } from "./AppWrapper";
import * as SplashScreen from "expo-splash-screen";
import { ModalProvider } from "./contexts";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <AppWrapper />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
