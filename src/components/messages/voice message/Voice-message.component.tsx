// src/components/messages/VoiceMemoMessage.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Sound from "react-native-sound";
import RNFS from "react-native-fs";
import { Play, Pause } from "react-native-vector-icons/Feather";
import { WhatsappChat } from "../../../backend/casaikos-api";
import { downloadFileAsBrowserUrl } from "../../utils";

// Simple waveform component (you can replace with a more sophisticated one)
import { SimpleWaveform } from "./SimpleWaveForm.component";

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
};

type VoiceMemoMessageProps = {
  whatsappMessage: WhatsappChat;
};

export const VoiceMemoMessage = ({
  whatsappMessage,
}: VoiceMemoMessageProps) => {
  const { isReply, hostedFile } = whatsappMessage;
  const soundRef = useRef<Sound | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    initializeAudio();
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  const initializeAudio = async () => {
    if (!hostedFile) return;

    try {
      setIsLoading(true);

      // Download the audio file
      const localPath = await downloadAudioFile();
      if (!localPath) return;

      // Initialize Sound
      Sound.setCategory("Playback");

      soundRef.current = new Sound(localPath, "", (error) => {
        if (error) {
          console.error("Failed to load sound", error);
          Alert.alert("Error", "Failed to load audio file");
          setIsLoading(false);
          return;
        }

        // Audio loaded successfully
        const audioDuration = soundRef.current?.getDuration() || 0;
        setDuration(audioDuration);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error initializing audio:", error);
      setIsLoading(false);
    }
  };

  const downloadAudioFile = async (): Promise<string | null> => {
    if (!hostedFile) return null;

    try {
      // Create a local file path
      const fileName = hostedFile.fileName || "audio.wav";
      const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Check if file already exists
      const fileExists = await RNFS.exists(localPath);
      if (fileExists) {
        return localPath;
      }

      // Download the file
      const downloadResult = await RNFS.downloadFile({
        fromUrl: hostedFile.url, // Assuming your hostedFile has a url property
        toFile: localPath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        return localPath;
      } else {
        throw new Error("Failed to download audio file");
      }
    } catch (error) {
      console.error("Error downloading audio file:", error);
      return null;
    }
  };

  const onPlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play((success) => {
        if (success) {
          setIsPlaying(false);
          setCurrentTime(0);
          setProgress(0);
        }
      });
      setIsPlaying(true);
      startProgressTracking();
    }
  };

  const startProgressTracking = () => {
    const interval = setInterval(() => {
      if (soundRef.current && isPlaying) {
        soundRef.current.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
          setProgress(duration > 0 ? seconds / duration : 0);

          if (seconds >= duration) {
            setIsPlaying(false);
            setCurrentTime(0);
            setProgress(0);
            clearInterval(interval);
          }
        });
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const handleSeek = (progressValue: number) => {
    if (soundRef.current && duration > 0) {
      const seekTime = progressValue * duration;
      soundRef.current.setCurrentTime(seekTime);
      setCurrentTime(seekTime);
      setProgress(progressValue);
    }
  };

  return (
    <View
      style={[styles.container, isReply ? styles.leftAlign : styles.rightAlign]}
    >
      <View
        style={[
          styles.voiceMemoBubble,
          isReply ? styles.replyBubble : styles.sentBubble,
        ]}
      >
        <TouchableOpacity
          onPress={onPlayPause}
          style={styles.playButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={isReply ? "#2664eb" : "#fff"}
            />
          ) : isPlaying ? (
            <Pause
              name="pause"
              size={20}
              color={isReply ? "#2664eb" : "#fff"}
            />
          ) : (
            <Play name="play" size={20} color={isReply ? "#2664eb" : "#fff"} />
          )}
        </TouchableOpacity>

        <View style={styles.waveformContainer}>
          <SimpleWaveform
            progress={progress}
            onSeek={handleSeek}
            isReply={isReply}
            isPlaying={isPlaying}
          />
        </View>

        <Text
          style={[
            styles.timeStamp,
            isReply ? styles.replyText : styles.sentText,
          ]}
        >
          {formatDuration(currentTime > 0 ? currentTime : duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  leftAlign: {
    alignSelf: "flex-start",
  },
  rightAlign: {
    alignSelf: "flex-end",
  },
  voiceMemoBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    maxWidth: 300,
    minWidth: 150,
  },
  replyBubble: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sentBubble: {
    backgroundColor: "#2664eb",
  },
  playButton: {
    marginRight: 8,
    padding: 4,
  },
  waveformContainer: {
    flex: 1,
    height: 32,
    marginHorizontal: 8,
  },
  timeStamp: {
    fontSize: 12,
    marginLeft: 8,
  },
  replyText: {
    color: "#666",
  },
  sentText: {
    color: "#fff",
  },
});
