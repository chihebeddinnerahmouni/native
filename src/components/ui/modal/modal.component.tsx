// src/components/ui/Modal.tsx
import React, { ReactNode, useEffect, useRef } from "react";
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../../constants/colors";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  animationType?: "slide" | "fade" | "none";
  presentationStyle?:
    | "fullScreen"
    | "pageSheet"
    | "formSheet"
    | "overFullScreen";
  slideDirection?: "bottom" | "top" | "left" | "right";
}

export const Modal = ({
  visible,
  onClose,
  title,
  children,
  slideDirection = "bottom",
}: ModalProps) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const getTransformStyle = () => {
    switch (slideDirection) {
      case "bottom":
        return {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [screenHeight, 0],
              }),
            },
          ],
        };
      case "top":
        return {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-screenHeight, 0],
              }),
            },
          ],
        };
      case "left":
        return {
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-screenWidth, 0],
              }),
            },
          ],
        };
      case "right":
        return {
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [screenWidth, 0],
              }),
            },
          ],
        };
      default:
        return {};
    }
  };

  const getOverlayStyle = () => {
    const baseStyle = styles.modalOverlay;
    switch (slideDirection) {
      case "top":
        return { ...baseStyle, justifyContent: "flex-start" as const };
      case "bottom":
        return { ...baseStyle, justifyContent: "flex-end" as const };
      case "left":
        return {
          ...baseStyle,
          flexDirection: "row" as const,
          justifyContent: "flex-start" as const,
        };
      case "right":
        return {
          ...baseStyle,
          flexDirection: "row" as const,
          justifyContent: "flex-end" as const,
        };
      default:
        return baseStyle;
    }
  };

  const getModalContainerStyle = () => {
    const baseStyle = styles.modalContainer;
    switch (slideDirection) {
      case "top":
        return {
          ...baseStyle,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        };
      case "left":
      case "right":
        return {
          ...baseStyle,
          borderRadius: 20,
          width: "100%" as const,
          height: "100%" as const,
          maxHeight: "100%" as const,
        };
      default:
        return baseStyle;
    }
  };

  if (!visible) return null;

  return (
    <RNModal
      visible={visible}
      animationType="none" // We'll handle animation ourselves
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={getOverlayStyle()}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View style={[getModalContainerStyle(), getTransformStyle()]}>
          <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                {title && <Text style={styles.title}>{title}</Text>}
              </View>

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {children}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: colors.bgColor,
    maxHeight: "90%",
    minHeight: "50%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.bgColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textColor,
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
  },
  content: {
    flex: 1,
    backgroundColor: colors.emptyBgColor,
  },
});
