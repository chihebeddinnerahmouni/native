import React from "react";
import { View, Text, StyleSheet } from "react-native";

export enum EntityType {
  AGENT = "agent",
  OWNER = "owner",
  TENANT = "tenant",
}

const getTypeColor = (entity: EntityType) => {
  switch (entity) {
    case EntityType.AGENT:
      return "#00931b"; // Green
    case EntityType.OWNER:
      return "#007bff"; // Blue
    case EntityType.TENANT:
      return "#ff6600"; // Orange
    default:
      return "#333"; // Default
  }
};

export type ProfileIconProps = {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  entity?: EntityType;
  size?: number;
};

export const ProfileIcon = ({
  firstName,
  lastName,
  entity = EntityType.AGENT,
  size = 40,
}: ProfileIconProps) => {
  const getInitials = () => {
    return (firstName?.[0] ?? "-") + (lastName?.[0] ?? "-");
  };

  const backgroundColor = getTypeColor(entity);

  return (
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
      <Text style={[styles.text, { fontSize: size * 0.35 }]}>
        {getInitials().toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
