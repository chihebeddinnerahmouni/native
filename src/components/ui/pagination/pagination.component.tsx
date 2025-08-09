import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: number; // Number of page numbers to show
  disabled?: boolean;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = 5,
  disabled = false,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(showPageNumbers / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (currentPage <= halfVisible) {
      end = Math.min(totalPages, showPageNumbers);
    }
    if (currentPage + halfVisible >= totalPages) {
      start = Math.max(1, totalPages - showPageNumbers + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (disabled || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.navButton,
          (currentPage === 1 || disabled) && styles.disabledButton,
        ]}
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
      >
        <Text
          style={[
            styles.buttonText,
            styles.navButtonText,
            (currentPage === 1 || disabled) && styles.disabledText,
          ]}
        >
          Previous
        </Text>
      </TouchableOpacity>

      {/* First page and ellipsis if needed */}
      {visiblePages[0] > 1 && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePageChange(1)}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          {visiblePages[0] > 2 && (
            <View style={styles.ellipsis}>
              <Text style={styles.ellipsisText}>...</Text>
            </View>
          )}
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.button,
            page === currentPage && styles.activeButton,
            disabled && styles.disabledButton,
          ]}
          onPress={() => handlePageChange(page)}
          disabled={disabled}
        >
          <Text
            style={[
              styles.buttonText,
              page === currentPage && styles.activeButtonText,
              disabled && styles.disabledText,
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Last page and ellipsis if needed */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <View style={styles.ellipsis}>
              <Text style={styles.ellipsisText}>...</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePageChange(totalPages)}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>{totalPages}</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.navButton,
          (currentPage === totalPages || disabled) && styles.disabledButton,
        ]}
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
      >
        <Text
          style={[
            styles.buttonText,
            styles.navButtonText,
            (currentPage === totalPages || disabled) && styles.disabledText,
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderColor || "#e0e0e0",
    backgroundColor: colors.bgColor || "#fff",
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    paddingHorizontal: 16,
    minWidth: 80,
  },
  activeButton: {
    backgroundColor: colors.primaryColor || "#007bff",
    borderColor: colors.primaryColor || "#007bff",
  },
  disabledButton: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor || "#333",
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeButtonText: {
    color: "#fff",
  },
  disabledText: {
    color: "#999",
  },
  ellipsis: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ellipsisText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "bold",
  },
});
