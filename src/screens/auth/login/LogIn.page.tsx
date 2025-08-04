import {
  PageTitle,
  PageSubtitle,
} from "../../../components/ui/texts/Texts.component";
import { LoginStyles } from "./login.style";
import { View } from "react-native";
import { FieldText } from "../../../components/ui/inputs/field-text/field-text.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { showErrorAlert } from "../../../components/ui/alerts/alerts.component";
import { useAuthMutation } from "../../../api-query/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInDto } from "../../../backend/casaikos-api";
import {
  AuthSchema,
  AxiosInstanceErrorResponse,
  ERoute,
  EScreens,
} from "../../../utils";
import { useAuth } from "../../../contexts";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainLayout } from "../../../layout/main-layout.layout";

type RootStackParamList = {
  [ERoute.VERIFY_OTP]: { email: string };
  [EScreens.MESSAGES]: undefined;
};

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onClickLogin = () => {
    const values = getValues();
    if (!values.email || !values.password) {
      showErrorAlert("Error", "Please fill in all fields");
      return;
    }

    loginMut({ values })
      .then((data) => {
        if (data.otpRequired) {
          navigation.navigate(ERoute.VERIFY_OTP, { email: values.email });
        } else {
          login(data);
          navigation.navigate(EScreens.MESSAGES);
        }
      })
      .catch((e: AxiosInstanceErrorResponse) => {
        console.error("Login error:", e);
        if (e.status === 401) {
          setError("email", { message: "" });
          setError("password", { message: "" });
        }
      });
  };

  return (
    <MainLayout>
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
          <Button onPress={handleSubmit(onClickLogin)}>Sign In</Button>
        </View>
      </View>
    </MainLayout>
  );
}
