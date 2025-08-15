import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import colors from "../../../../constants/colors";

export const PaymentCardSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = () => {
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => shimmer());
    };
    shimmer();
  }, [shimmerAnimation]);

  const shimmerColor = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F0F0F0", "#E0E0E0"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View
          style={[styles.statusSkeleton, { backgroundColor: shimmerColor }]}
        />
        <Animated.View
          style={[styles.dotsSkeleton, { backgroundColor: shimmerColor }]}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Animated.View
            style={[styles.labelSkeleton, { backgroundColor: shimmerColor }]}
          />
          <Animated.View
            style={[styles.valueSkeleton, { backgroundColor: shimmerColor }]}
          />
        </View>

        <View style={styles.row}>
          <Animated.View
            style={[styles.labelSkeleton, { backgroundColor: shimmerColor }]}
          />
          <Animated.View
            style={[styles.valueSkeleton, { backgroundColor: shimmerColor }]}
          />
        </View>

        <View style={styles.row}>
          <Animated.View
            style={[styles.labelSkeleton, { backgroundColor: shimmerColor }]}
          />
          <Animated.View
            style={[styles.valueSkeleton, { backgroundColor: shimmerColor }]}
          />
        </View>

        <View style={styles.row}>
          <Animated.View
            style={[styles.labelSkeleton, { backgroundColor: shimmerColor }]}
          />
          <Animated.View
            style={[styles.badgeSkeleton, { backgroundColor: shimmerColor }]}
          />
        </View>

        <View style={styles.row}>
          <Animated.View
            style={[styles.labelSkeleton, { backgroundColor: shimmerColor }]}
          />
          <Animated.View
            style={[styles.valueSkeleton, { backgroundColor: shimmerColor }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusSkeleton: {
    height: 20,
    width: "40%",
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
  },
  dotsSkeleton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  content: {
    marginTop: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    padding: 8,
    backgroundColor: colors.emptyBgColor2,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  labelSkeleton: {
    height: 14,
    width: "25%",
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
  },
  valueSkeleton: {
    height: 14,
    width: "35%",
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
  },
  badgeSkeleton: {
    height: 20,
    width: 60,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
});
