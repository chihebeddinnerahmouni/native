import {
  PageTitle,
  PageSubtitle,
} from "../../components/ui/texts/Texts.component";
import { LoginStyles } from "./login.style";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FieldText } from "../../components/ui/inputs/field-text/field-text.component";
import { Button } from "../../components/ui/buttons/button.component";
import { showErrorAlert } from "../../components/ui/alerts/alerts.component";
import { useAuthMutation } from "../../api-query/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInDto } from "../../backend/casaikos-api";
import { AuthSchema, AxiosInstanceErrorResponse } from "../../utils";
import { useAuth } from "../../contexts";

export function LoginScreen() {
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignInDto>({
    resolver: yupResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login: loginMut } = useAuthMutation();
  const { login } = useAuth();

  const onClickLogin = () => {
    const values = getValues();
    if (!values.email || !values.password) {
      showErrorAlert("Error", "Please fill in all fields");
      return;
    }

    loginMut({ values })
      .then((data) => {
        console.log("Login successful:", data);
        if (data.otpRequired) {
          // navigate(`/${ERoute.VERIFY_OTP}`, { state: { email: values.email } });admin@casakios.com
        } else {
          login(data);
        }
      })
      .catch((e: AxiosInstanceErrorResponse) => {
        if (e.status === 401) {
          setError("email", { message: "" });
          setError("password", { message: "" });
        }
      });
  };

  return (
    <SafeAreaView style={LoginStyles.safeArea}>
      <View style={LoginStyles.container}>
        <PageTitle>Hello Again! Sign in to Access Your Dashboard</PageTitle>
        <PageSubtitle style={LoginStyles.PageSubtitle}>
          Manage your properties, track bookings, and stay updated — all in one
          place.
        </PageSubtitle>

        <View style={LoginStyles.formContainer}>
          <FieldText
            label="Email"
            placeholder="Enter your email"
            value={watch("email")}
            register={register("email", { required: true })}
            error={errors.email}
          />

          <FieldText
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={watch("password")}
            register={register("password", { required: true })}
            error={errors.password}
          />

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
          <Button onPress={handleSubmit(onClickLogin)}>Sign In</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
