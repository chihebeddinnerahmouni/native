import {
  PageTitle,
  PageSubtitle,
} from "../../components/ui/Title-page.component";
import { LoginStyles } from "./login.style";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function LoginScreen() {
  return (
    <SafeAreaView style={LoginStyles.safeArea}>
      <View style={LoginStyles.container}>
        <PageTitle>Hello Again! Sign in to Access Your Dashboard</PageTitle>
        <PageSubtitle style={LoginStyles.PageSubtitle}>
          Manage your properties, track bookings, and stay updated — all in one
          place.
        </PageSubtitle>
      </View>
    </SafeAreaView>
  );
}
