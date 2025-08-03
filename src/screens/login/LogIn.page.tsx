import { TitlePageComponent } from "../../components/ui/Title-page.component";
import { LoginStyles } from "./login.style";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={LoginStyles.container}>
        <TitlePageComponent title="Hello Again! Sign in to Access Your Dashboard" />
      </View>
    </SafeAreaView>
  );
}
