import React from "react";
import { View, StyleSheet } from "react-native";
import { TextBody } from "./texts/Texts.component";
import colors from "../../constants/colors";

export enum EntityType {
  AGENT = "agent",
  OWNER = "owner",
  TENANT = "tenant",
}

const getTypeColor = (entity: EntityType) => {
  switch (entity) {
    case EntityType.AGENT:
      return "#00931b";
    case EntityType.OWNER:
      return "#007bff";
    case EntityType.TENANT:
      return "#ff6600";
    default:
      return "#333";
  }
};

export type ProfileIconProps = {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  entity?: EntityType;
  size?: number;
  isOnline?: boolean;
  color?: string;
};

export const ProfileIcon = ({
  firstName,
  lastName,
  entity = EntityType.AGENT,
  size = 40,
  isOnline = false,
  color,
}: ProfileIconProps) => {
  const getInitials = () => {
    return (firstName?.[0] ?? "-") + (lastName?.[0] ?? "-");
  };

  const backgroundColor = color || getTypeColor(entity);

  return (
    <View style={styles.profileIconContainer}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <TextBody style={[styles.text, { fontSize: size * 0.35 }]}>
          {getInitials().toUpperCase()}
        </TextBody>
      </View>
      {isOnline && <View style={styles.onlineDot} />}
    </View>
  );
};

const styles = StyleSheet.create({
  profileIconContainer: {
    position: "relative",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.bgColor,
    fontWeight: "bold",
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4caf50",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
