import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";

type RadioGroupProps = {
  label?: string;
  options: {
    label: string;
    value: string | number | boolean;
    disabled?: boolean;
  }[];
  name: string;
  style?: ViewStyle;
  onChange?: (value: string | boolean | number) => void;
  value?: string | boolean | number;
  error?: { message?: string };
};

export const RadioGroup = ({
  label,
  options,
  style,
  onChange,
  value,
  error,
}: RadioGroupProps) => {
  const handleChange = (selectedValue: string | boolean | number) => {
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.optionsContainer}>
        {options.map((el, index) => {
          const isSelected = value === el.value;
          const isDisabled = el.disabled;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionContainer,
                isSelected && styles.optionContainerSelected,
                isDisabled && styles.optionContainerDisabled,
              ]}
              onPress={() => !isDisabled && handleChange(el.value)}
              disabled={isDisabled}
              activeOpacity={0.7}
            >
              <View style={styles.labelContainer}>
                <Text
                  style={[
                    styles.titleRadio,
                    isDisabled && styles.titleRadioDisabled,
                  ]}
                >
                  {el.label}
                </Text>
              </View>

              <View
                style={[
                  styles.dot,
                  isSelected && styles.dotSelected,
                  isDisabled && styles.dotDisabled,
                ]}
              >
                {isSelected && <View style={styles.dotInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && error.message && (
        <Text style={styles.errorContainer}>{error.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 24,
  },
  optionContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9eaec",
  },
  optionContainerSelected: {
    borderColor: "#007AFF", // Replace with your primary color
  },
  optionContainerDisabled: {
    backgroundColor: "#f5f5f5",
    opacity: 0.6,
  },
  labelContainer: {
    flex: 1,
    marginRight: 20,
  },
  titleRadio: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
  titleRadioDisabled: {
    color: "#999",
  },
  dot: {
    height: 20,
    width: 20,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dotSelected: {
    backgroundColor: "#007AFF", // Replace with your primary color
  },
  dotDisabled: {
    backgroundColor: "#ccc",
  },
  dotInner: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  errorContainer: {
    fontSize: 13,
    color: "red",
    marginTop: 4,
  },
});
