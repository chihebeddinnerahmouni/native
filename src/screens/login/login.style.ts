import { StyleSheet } from "react-native";
import { PageSubtitle } from "../../components/ui/Title-page.component";

export const LoginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  PageSubtitle: {
    ...PageSubtitle,
    marginTop: 16,
  },
});
