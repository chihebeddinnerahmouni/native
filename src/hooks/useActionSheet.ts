import { Platform, Alert } from "react-native";

export interface ActionSheetOption {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

export interface UseActionSheetProps {
  title?: string;
  message?: string;
  options: ActionSheetOption[];
}

export const useActionSheet = () => {
  const showActionSheet = ({
    title,
    message,
    options,
  }: UseActionSheetProps) => {
    if (Platform.OS === "ios") {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ActionSheetIOS } = require("react-native");

      const iosOptions = options.map((option) => option.text);
      const cancelButtonIndex = options.findIndex(
        (option) => option.style === "cancel"
      );
      const destructiveButtonIndex = options.findIndex(
        (option) => option.style === "destructive"
      );

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
          message,
          options: iosOptions,
          cancelButtonIndex:
            cancelButtonIndex >= 0 ? cancelButtonIndex : undefined,
          destructiveButtonIndex:
            destructiveButtonIndex >= 0 ? destructiveButtonIndex : undefined,
        },
        (buttonIndex: number) => {
          if (buttonIndex >= 0 && buttonIndex < options.length) {
            options[buttonIndex].onPress?.();
          }
        }
      );
    } else {
      // Android fallback using Alert
      const alertButtons = options.map((option) => ({
        text: option.text,
        onPress: option.onPress,
        style: option.style,
      }));

      Alert.alert(title || "Options", message, alertButtons);
    }
  };

  return { showActionSheet };
};
