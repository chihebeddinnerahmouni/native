import React from "react";
import { useFonts } from "expo-font";

interface WithFontsProps {
  children: React.ReactNode;
  onFontsLoaded?: () => void;
  loadingComponent?: React.ReactNode;
}

export const FontLoader: React.FC<WithFontsProps> = ({
  children,
  onFontsLoaded,
  loadingComponent,
}) => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.ttf"),
    "Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.ttf"),
    "Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.ttf"),
    "Satoshi-Light": require("../../assets/fonts/Satoshi-Light.ttf"),
  });

  React.useEffect(() => {
    if (fontsLoaded && onFontsLoaded) {
      onFontsLoaded();
    }
  }, [fontsLoaded, onFontsLoaded]);

  if (!fontsLoaded) {
    return <>{loadingComponent}</> || null;
  }

  return <>{children}</>;
};
