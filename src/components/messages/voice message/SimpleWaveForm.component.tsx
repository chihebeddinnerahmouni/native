/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/messages/SimpleWaveform.tsx
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Dimensions,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

type SimpleWaveformProps = {
  progress: number;
  onSeek: (progress: number) => void;
  isReply: boolean;
  isPlaying: boolean;
};

export const SimpleWaveform = ({
  progress,
  onSeek,
  isReply,
  isPlaying,
}: SimpleWaveformProps) => {
  const screenWidth = Dimensions.get("window").width;
  const waveformWidth = Math.min(screenWidth * 0.5, 200);
  const barCount = 40;
  const barWidth = 2;
  const barGap = 1;

  // Generate random heights for bars (in a real app, you'd get this from audio analysis)
  const barHeights = React.useMemo(() => {
    return Array.from({ length: barCount }, () => Math.random() * 20 + 5);
  }, []);

  const handleTouch = (event: any) => {
    const { locationX } = event.nativeEvent;
    const progressValue = Math.max(0, Math.min(1, locationX / waveformWidth));
    onSeek(progressValue);
  };

  const progressBarWidth = progress * waveformWidth;

  return (
    <TouchableOpacity
      style={[styles.container, { width: waveformWidth }]}
      onPress={handleTouch}
      activeOpacity={0.7}
    >
      <View style={styles.waveformContainer}>
        {barHeights.map((height, index) => {
          const isActive = index / barCount <= progress;
          return (
            <View
              key={index}
              style={[
                styles.bar,
                {
                  height,
                  width: barWidth,
                  backgroundColor: isActive
                    ? "#2664eb"
                    : isReply
                      ? "#d0d0d0"
                      : "rgba(255, 255, 255, 0.5)",
                  marginRight: index < barCount - 1 ? barGap : 0,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Progress indicator */}
      <View
        style={[
          styles.progressIndicator,
          {
            left: progressBarWidth - 1,
            backgroundColor: "#2664eb",
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    justifyContent: "center",
    position: "relative",
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  bar: {
    borderRadius: 1,
  },
  progressIndicator: {
    position: "absolute",
    width: 2,
    height: "100%",
    borderRadius: 1,
  },
});
