import {
  PageTitle,
  PageSubtitle,
} from "../../components/ui/texts/Texts.component";
import { LoginStyles } from "./login.style";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
// import { FieldText } from "../../components/ui/inputs/field-text/field-text.component";
// import { useLogin } from "../../api-query/auth.hooks";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const loginMutation = useLogin();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // loginMutation.mutate(
    //   { email, password },
    //   {
    //     onSuccess: (data) => {
    //       Alert.alert("Success", `Welcome back, ${data.user.name}!`);
    //       // Navigate to main app here
    //     },
    //     onError: (error) => {
    //       Alert.alert("Login Failed", "Please check your credentials");
    //       console.error("Login error:", error);
    //     },
    //   }
    // );
  };

  return (
    <SafeAreaView style={LoginStyles.safeArea}>
      <View style={LoginStyles.container}>
        <PageTitle>Hello Again! Sign in to Access Your Dashboard</PageTitle>
        <PageSubtitle style={LoginStyles.PageSubtitle}>
          Manage your properties, track bookings, and stay updated — all in one
          place.
        </PageSubtitle>

        {/* Simple login form - you can style this better */}
        <View style={{ marginTop: 40, gap: 16 }}>
          {/* <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 12,
              borderRadius: 8,
              fontSize: 16,
            }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 12,
              borderRadius: 8,
              fontSize: 16,
            }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          /> */}
          {/* <FieldText
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            // secureTextEntry
          /> */}

          {/* <TouchableOpacity
            style={{
              backgroundColor: "#2664EB",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
              // opacity: loginMutation.isPending ? 0.7 : 1,
            }}
            onPress={handleLogin}
            // disabled={loginMutation.isPending}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Sign In
            </Text>
          </TouchableOpacity>*/}
        </View>
      </View>
    </SafeAreaView>
  );
}
