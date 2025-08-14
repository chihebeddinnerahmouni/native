import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import colors from "../../../../../constants/colors";

export const PropertyMiniCardSkeleton = () => {
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
      <View style={styles.topContainer}>
        {/* Image skeleton */}
        <Animated.View
          style={[styles.imageSkeleton, { backgroundColor: shimmerColor }]}
        />

        {/* Info container skeleton */}
        <View style={styles.infosContainer}>
          {/* Title skeleton */}
          <Animated.View
            style={[styles.titleSkeleton, { backgroundColor: shimmerColor }]}
          />

          {/* Location skeleton */}
          <View style={styles.locationContainer}>
            <Animated.View
              style={[
                styles.locationIconSkeleton,
                { backgroundColor: shimmerColor },
              ]}
            />
            <Animated.View
              style={[
                styles.locationTextSkeleton,
                { backgroundColor: shimmerColor },
              ]}
            />
          </View>

          {/* Indicators skeleton */}
          <View style={styles.indicatorsContainer}>
            <Animated.View
              style={[
                styles.indicatorSkeleton,
                { backgroundColor: shimmerColor },
              ]}
            />
            <Animated.View
              style={[
                styles.indicatorSkeleton,
                { backgroundColor: shimmerColor },
              ]}
            />
            <Animated.View
              style={[
                styles.indicatorSkeleton,
                { backgroundColor: shimmerColor },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infosContainer: {
    flex: 1,
    marginLeft: 12,
  },
  imageSkeleton: {
    width: 75,
    height: 75,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  titleSkeleton: {
    height: 18,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    marginBottom: 8,
    width: "70%",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationIconSkeleton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    marginRight: 6,
  },
  locationTextSkeleton: {
    height: 14,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    width: "50%",
  },
  indicatorsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  indicatorSkeleton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },
});
