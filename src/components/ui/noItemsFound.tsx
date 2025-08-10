import React from "react";
import { View, StyleSheet } from "react-native";
import { TextBody } from "./texts/Texts.component";
import colors from "../../constants/colors";
import { SearchIcon } from "../../icons";

type NoItemsFoundProps = {
  message?: string;
  icon?: React.ReactNode;
};

export const NoItemsFound: React.FC<NoItemsFoundProps> = ({
  message = "No items found",
  icon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.noItemsContainer}>
        {icon || <SearchIcon title="No items found" />}
        <TextBody style={styles.text}>{message}</TextBody>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: colors.textColor2,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default NoItemsFound;
