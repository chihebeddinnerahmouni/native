import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import { BackArrowIcon } from "../icons";
import { useNavigation } from "@react-navigation/native";

type AppLayoutProps = {
  children: React.ReactNode;
  isBackButtonVisible?: boolean;
  HeaderLeft?: React.ReactNode;
  HeaderRight?: React.ReactNode;
  hasPadding?: boolean;
};
export const MainLayout = ({
  children,
  HeaderLeft,
  HeaderRight,
  isBackButtonVisible = true,
  hasPadding = true,
}: AppLayoutProps) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {isBackButtonVisible && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrowIcon />
            </TouchableOpacity>
          )}
          {HeaderLeft}
        </View>
        {HeaderRight}
      </View>
      <ScrollView style={[styles.container, hasPadding && styles.hasPadding]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  container: {
    flex: 1,
    // padding: 16,
    paddingBottom: 36,
    backgroundColor: colors.emptyBgColor,
    // backgroundColor: "#f8f9fa",
  },
  hasPadding: {
    padding: 16,
  },
});
