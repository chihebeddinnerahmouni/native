/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ui/Select.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Controller, FieldError, UseFormRegisterReturn } from "react-hook-form";
import Feather from "react-native-vector-icons/Feather";
import { Modal } from "../modal/modal.component";

export type OptionType = {
  value: string | number;
  label: string;
  isDisabled?: boolean;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError;
  onClick?: () => void;
  onChange?: (value: string | number) => void;
  options: OptionType[];
  value?: string | number;
  register?: UseFormRegisterReturn<any>;
  control?: any;
  withoutChip?: boolean;
  searchable?: boolean;
  multiple?: boolean;
};

export const Select = ({
  label,
  value,
  onChange,
  required,
  options,
  register,
  disabled,
  error,
  placeholder,
  onClick,
  control,
  withoutChip = false,
  searchable = true,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    value || null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleChange = (newValue: string | number) => {
    setSelectedValue(newValue);
    setIsOpen(false);
    setSearchText("");

    if (register) {
      register.onChange?.({
        target: {
          value: newValue,
          name: register.name,
        },
      });
    }

    onChange?.(newValue);
  };

  const openModal = () => {
    if (disabled) return;
    setIsOpen(true);
    setFilteredOptions(options);
    onClick?.();
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearchText("");
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (!text.trim()) {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setFilteredOptions(options);
  };

  useEffect(() => {
    setSelectedValue(value || null);
  }, [value]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const renderWithControl = () => (
    <Controller
      control={control}
      name={register?.name ?? ""}
      render={({ field: { onChange: fieldOnChange, value: fieldValue } }) => (
        <SelectComponent
          selectedValue={fieldValue}
          onValueChange={(newValue) => {
            fieldOnChange(newValue);
            onChange?.(newValue);
            if (register) {
              register.onChange?.({
                target: {
                  value: newValue,
                  name: register.name,
                },
              });
            }
          }}
        />
      )}
    />
  );

  const renderWithoutControl = () => (
    <SelectComponent
      selectedValue={selectedValue}
      onValueChange={handleChange}
    />
  );

  const SelectComponent = ({
    selectedValue: compSelectedValue,
    onValueChange,
  }: {
    selectedValue: any;
    onValueChange: (value: any) => void;
  }) => {
    const currentOption = options.find(
      (option) => option.value === compSelectedValue
    );

    return (
      <>
        <TouchableOpacity
          style={[
            styles.selector,
            error && styles.selectorError,
            disabled && styles.selectorDisabled,
          ]}
          onPress={openModal}
          disabled={disabled}
        >
          <View style={styles.selectorContent}>
            {!withoutChip && currentOption && (
              <View style={styles.chip}>
                <Text style={styles.chipText}>{currentOption.label}</Text>
              </View>
            )}
            <Text
              style={[
                styles.selectorText,
                !currentOption && styles.placeholderText,
                !withoutChip && currentOption && styles.selectorTextWithChip,
              ]}
            >
              {!withoutChip && currentOption
                ? ""
                : currentOption
                  ? currentOption.label
                  : placeholder}
            </Text>
          </View>
          <Feather
            name="chevron-down"
            size={20}
            color={disabled ? "#ccc" : "#666"}
          />
        </TouchableOpacity>

        <Modal
          visible={isOpen}
          onClose={closeModal}
          title={label || "Select Option"}
          slideDirection="bottom"
        >
          <View style={styles.modalContentWrapper}>
            {/* Search */}
            {searchable && (
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Feather
                    name="search"
                    size={20}
                    color="#666"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search options..."
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholderTextColor="#999"
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity
                      onPress={clearSearch}
                      style={styles.clearButton}
                    >
                      <Feather name="x" size={16} color="#666" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Options List */}
            <ScrollView
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => (
                  <TouchableOpacity
                    key={item.value.toString()}
                    style={[
                      styles.option,
                      item.value === compSelectedValue && styles.selectedOption,
                      item.isDisabled && styles.disabledOption,
                    ]}
                    onPress={() =>
                      !item.isDisabled && onValueChange(item.value)
                    }
                    disabled={item.isDisabled}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.value === compSelectedValue &&
                          styles.selectedOptionText,
                        item.isDisabled && styles.disabledOptionText,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.value === compSelectedValue && (
                      <Feather name="check" size={20} color="#007bff" />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No options found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {control ? renderWithControl() : renderWithoutControl()}

      {error && <Text style={styles.errorText}>{error?.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#dc3545",
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    minHeight: 48,
  },
  selectorError: {
    borderColor: "#dc3545",
  },
  selectorDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  selectorContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  selectorText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectorTextWithChip: {
    marginLeft: 8,
  },
  placeholderText: {
    color: "#999",
  },
  chip: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    color: "#007bff",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: "#dc3545",
    marginTop: 4,
  },
  modalContentWrapper: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  optionsList: {
    flex: 1,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedOption: {
    backgroundColor: "#f8f9fa",
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectedOptionText: {
    color: "#007bff",
    fontWeight: "600",
  },
  disabledOptionText: {
    color: "#999",
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default Select;
