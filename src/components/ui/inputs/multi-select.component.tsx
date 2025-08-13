/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ViewStyle,
} from "react-native";
import { Controller, FieldError, UseFormRegisterReturn } from "react-hook-form";
import Feather from "react-native-vector-icons/Feather";
import { Modal } from "../modal/modal.component";

export type OptionType = {
  value: string | number;
  label: string;
  isDisabled?: boolean;
};

type MultiSelectProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError;
  onClick?: () => void;
  onChange?: (values: (string | number)[]) => void;
  options: OptionType[];
  value?: (string | number)[];
  register?: UseFormRegisterReturn<any>;
  control?: any;
  searchable?: boolean;
  flex?: boolean;
  styles?: ViewStyle;
  maxSelectedDisplay?: number; // How many selected items to show before "X more"
};

export const MultiSelect = ({
  label,
  value = [],
  onChange,
  required,
  options,
  register,
  disabled,
  error,
  placeholder,
  onClick,
  control,
  searchable = true,
  styles,
  flex = false,
  maxSelectedDisplay = 2,
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    value || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const mapValuesToOptions = (vals: (string | number)[]) =>
    vals
      .map((val) => options.find((op) => op.value === val))
      .filter(Boolean) as OptionType[];

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
    setSelectedValues(value || []);
  }, [value]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const renderWithControl = () => (
    <Controller
      control={control}
      name={register?.name ?? ""}
      render={({ field: { onChange: fieldOnChange, value: fieldValue } }) => (
        <MultiSelectComponent
          selectedValues={fieldValue || []}
          onValuesChange={(newValues) => {
            fieldOnChange(newValues);
            onChange?.(newValues);
            if (register) {
              register.onChange?.({
                target: {
                  value: newValues,
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
    <MultiSelectComponent
      selectedValues={selectedValues}
      onValuesChange={(newValues) => {
        setSelectedValues(newValues);
        onChange?.(newValues);
        if (register) {
          register.onChange?.({
            target: {
              value: newValues,
              name: register.name,
            },
          });
        }
      }}
    />
  );

  const MultiSelectComponent = ({
    selectedValues: compSelectedValues,
    onValuesChange,
  }: {
    selectedValues: (string | number)[];
    onValuesChange: (values: (string | number)[]) => void;
  }) => {
    const selectedOptions = mapValuesToOptions(compSelectedValues);

    return (
      <>
        <TouchableOpacity
          style={[
            multiSelectStyles.selector,
            error && multiSelectStyles.selectorError,
            disabled && multiSelectStyles.selectorDisabled,
            styles,
          ]}
          onPress={openModal}
          disabled={disabled}
        >
          <View style={multiSelectStyles.selectorContent}>
            {selectedOptions.length > 0 ? (
              <View style={multiSelectStyles.selectedContainer}>
                {selectedOptions.slice(0, maxSelectedDisplay).map((option) => (
                  <View key={option.value} style={multiSelectStyles.chip}>
                    <Text style={multiSelectStyles.chipText}>
                      {option.label}
                    </Text>
                  </View>
                ))}
                {selectedOptions.length > maxSelectedDisplay && (
                  <View style={multiSelectStyles.moreChip}>
                    <Text style={multiSelectStyles.moreChipText}>
                      +{selectedOptions.length - maxSelectedDisplay} more
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <Text style={multiSelectStyles.placeholderText}>
                {placeholder || "Select options"}
              </Text>
            )}
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
          title={label || "Select Options"}
          slideDirection="bottom"
        >
          <View style={multiSelectStyles.modalContentWrapper}>
            {/* Search */}
            {searchable && (
              <View style={multiSelectStyles.searchContainer}>
                <View style={multiSelectStyles.searchInputContainer}>
                  <Feather
                    name="search"
                    size={20}
                    color="#666"
                    style={multiSelectStyles.searchIcon}
                  />
                  <TextInput
                    style={multiSelectStyles.searchInput}
                    placeholder="Search options..."
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholderTextColor="#999"
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity
                      onPress={clearSearch}
                      style={multiSelectStyles.clearButton}
                    >
                      <Feather name="x" size={16} color="#666" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Action buttons */}
            <View style={multiSelectStyles.actionContainer}>
              <TouchableOpacity
                style={multiSelectStyles.actionButton}
                onPress={() => {
                  const newValues = [...compSelectedValues];
                  filteredOptions.forEach((option) => {
                    if (
                      !option.isDisabled &&
                      !newValues.includes(option.value)
                    ) {
                      newValues.push(option.value);
                    }
                  });
                  onValuesChange(newValues);
                }}
              >
                <Text style={multiSelectStyles.actionButtonText}>
                  Select All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={multiSelectStyles.actionButton}
                onPress={() => onValuesChange([])}
              >
                <Text style={multiSelectStyles.actionButtonText}>
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <ScrollView
              style={multiSelectStyles.optionsList}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => {
                  const isSelected = compSelectedValues.includes(item.value);
                  return (
                    <TouchableOpacity
                      key={item.value.toString()}
                      style={[
                        multiSelectStyles.option,
                        isSelected && multiSelectStyles.selectedOption,
                        item.isDisabled && multiSelectStyles.disabledOption,
                      ]}
                      onPress={() => {
                        if (!item.isDisabled) {
                          const newValues = isSelected
                            ? compSelectedValues.filter(
                                (val) => val !== item.value
                              )
                            : [...compSelectedValues, item.value];
                          onValuesChange(newValues);
                        }
                      }}
                      disabled={item.isDisabled}
                    >
                      <Text
                        style={[
                          multiSelectStyles.optionText,
                          isSelected && multiSelectStyles.selectedOptionText,
                          item.isDisabled &&
                            multiSelectStyles.disabledOptionText,
                        ]}
                      >
                        {item.label}
                      </Text>
                      <View style={multiSelectStyles.checkboxContainer}>
                        <View
                          style={[
                            multiSelectStyles.checkbox,
                            isSelected && multiSelectStyles.checkedCheckbox,
                          ]}
                        >
                          {isSelected && (
                            <Feather name="check" size={16} color="#fff" />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={multiSelectStyles.emptyContainer}>
                  <Text style={multiSelectStyles.emptyText}>
                    No options found
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Apply/Close buttons */}
            <View style={multiSelectStyles.bottomActions}>
              <TouchableOpacity
                style={[
                  multiSelectStyles.bottomButton,
                  multiSelectStyles.applyButton,
                ]}
                onPress={closeModal}
              >
                <Text style={multiSelectStyles.applyButtonText}>
                  Apply ({compSelectedValues.length} selected)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  return (
    <View
      style={
        flex ? multiSelectStyles.container : multiSelectStyles.containerNoFlex
      }
    >
      {label && (
        <Text style={multiSelectStyles.label}>
          {label}
          {required && <Text style={multiSelectStyles.required}> *</Text>}
        </Text>
      )}

      {control ? renderWithControl() : renderWithoutControl()}

      {error && (
        <Text style={multiSelectStyles.errorText}>{error?.message}</Text>
      )}
    </View>
  );
};

const multiSelectStyles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 0,
  },
  containerNoFlex: {},
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
  },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  chip: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 12,
    color: "#007bff",
    fontWeight: "500",
  },
  moreChip: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  moreChipText: {
    fontSize: 12,
    color: "#666",
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
  actionContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  actionButtonText: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "500",
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
    fontWeight: "500",
  },
  disabledOptionText: {
    color: "#999",
  },
  checkboxContainer: {
    marginLeft: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkedCheckbox: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
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
  bottomActions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  bottomButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: "#007bff",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default MultiSelect;
