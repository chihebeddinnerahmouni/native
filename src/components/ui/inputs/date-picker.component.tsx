import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  FieldError,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { colors } from "../../../constants/colors";
import { TextLabel } from "../texts/Texts.component";

type DatePickerProps = {
  label?: string;
  placeholder?: string;
  value?: Date;
  onDateChange?: (date: Date) => void;
  required?: boolean;
  register?: UseFormRegisterReturn<string>;
  style?: object;
  disabled?: boolean;
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: UseFormSetValue<Record<string, any>>;
  mode?: "date" | "time" | "datetime";
  minimumDate?: Date;
  maximumDate?: Date;
  flex?: boolean;
};

export const DatePicker = ({
  label,
  placeholder = "Select date",
  required,
  onDateChange,
  value,
  register,
  style,
  disabled,
  error,
  setValue,
  mode = "date",
  minimumDate,
  maximumDate,
  flex = false,
}: DatePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";

    if (mode === "date") {
      return date.toLocaleDateString();
    } else if (mode === "time") {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleString();
    }
  };

  const handleDateChange = (event: unknown, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (date) {
      setSelectedDate(date);

      // Update form value if register is provided
      if (register && register.onChange) {
        const formattedValue =
          mode === "date"
            ? date.toISOString().split("T")[0] // YYYY-MM-DD format
            : date.toISOString();
        register.onChange({
          target: { value: formattedValue, name: register.name },
        });
      }

      // Update via setValue if provided
      if (setValue && register?.name) {
        const formattedValue =
          mode === "date"
            ? date.toISOString().split("T")[0]
            : date.toISOString();
        setValue(register.name, formattedValue);
      }

      // Call external onChange
      if (onDateChange) {
        onDateChange(date);
      }
    }
  };

  const openPicker = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  const displayValue = formatDate(selectedDate);

  return (
    <View
      style={[
        style,
        flex ? styles.container : styles.containerNoFlex,
        error && styles.errorContainer,
      ]}
    >
      {label && (
        <TextLabel style={styles.label}>
          {label}
          {required && <TextLabel style={styles.required}>*</TextLabel>}
        </TextLabel>
      )}

      <TouchableOpacity
        style={[styles.inputContainer, disabled && styles.disabled]}
        onPress={openPicker}
        disabled={disabled}
      >
        <TextLabel
          style={[styles.inputText, !displayValue && styles.placeholderText]}
        >
          {displayValue || placeholder}
        </TextLabel>
      </TouchableOpacity>

      {error && (
        <TextLabel style={styles.errorText}>{error?.message}</TextLabel>
      )}

      {showPicker && (
        <>
          {Platform.OS === "ios" ? (
            <Modal
              transparent
              animationType="slide"
              visible={showPicker}
              onRequestClose={() => setShowPicker(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity
                      onPress={() => setShowPicker(false)}
                      style={styles.modalButton}
                    >
                      <TextLabel style={styles.modalButtonText}>
                        Cancel
                      </TextLabel>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowPicker(false)}
                      style={styles.modalButton}
                    >
                      <TextLabel
                        style={[styles.modalButtonText, styles.doneButton]}
                      >
                        Done
                      </TextLabel>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode={mode}
                    display="spinner"
                    onChange={handleDateChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                  />
                </View>
              </View>
            </Modal>
          ) : (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode={mode}
              display="default"
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 0,
  },
  containerNoFlex: {},
  errorContainer: {
    borderColor: colors.errorColor,
  },
  label: {
    marginBottom: 8,
  },
  required: {
    color: colors.errorColor,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    backgroundColor: colors.bgColor,
    minHeight: 48,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  disabled: {
    backgroundColor: colors.emptyBgColor,
    opacity: 0.6,
  },
  inputText: {
    fontSize: 16,
    color: colors.textColor,
    flex: 1,
    paddingVertical: 12,
  },
  placeholderText: {
    color: colors.placeHolderColor,
  },
  errorText: {
    fontSize: 12,
    color: colors.errorColor,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.bgColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  modalButtonText: {
    fontSize: 16,
    color: colors.primaryColor,
  },
  doneButton: {
    fontWeight: "600",
  },
});
