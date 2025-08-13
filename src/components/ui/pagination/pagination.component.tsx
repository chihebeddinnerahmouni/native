import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { TextBody } from "../texts/Texts.component";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  pageSize: number;
  totalItems: number;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  pageSize,
  totalItems,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: number[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const prevPage = currentPage - 1;
      const nextPage = currentPage + 1;

      if (prevPage >= 1) {
        pages.push(prevPage);
      }

      pages.push(currentPage);

      if (nextPage <= totalPages) {
        pages.push(nextPage);
      }
    }

    return pages;
  };

  const shouldShowFirstPage = () => {
    return totalPages > 3 && visiblePages[0] > 1;
  };

  const shouldShowLastPage = () => {
    return totalPages > 3 && visiblePages[visiblePages.length - 1] < totalPages;
  };

  const shouldShowLeftEllipsis = () => {
    return totalPages > 3 && visiblePages[0] > 2;
  };

  const shouldShowRightEllipsis = () => {
    return (
      totalPages > 3 && visiblePages[visiblePages.length - 1] < totalPages - 1
    );
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (disabled || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  return (
    <>
      <View style={styles.paginationInfo}>
        <TextBody style={styles.paginationText}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </TextBody>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.navButton,
            (currentPage === 1 || disabled) && styles.disabledButton,
          ]}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
        >
          <TextBody
            style={[
              styles.buttonText,
              styles.navButtonText,
              (currentPage === 1 || disabled) && styles.disabledText,
            ]}
          >
            Previous
          </TextBody>
        </TouchableOpacity>

        {shouldShowFirstPage() && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePageChange(1)}
              disabled={disabled}
            >
              <TextBody style={styles.buttonText}>1</TextBody>
            </TouchableOpacity>
            {shouldShowLeftEllipsis() && (
              <View style={styles.ellipsis}>
                <TextBody style={styles.ellipsisText}>...</TextBody>
              </View>
            )}
          </>
        )}

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
            <TextBody
              style={[
                styles.buttonText,
                page === currentPage && styles.activeButtonText,
                disabled && styles.disabledText,
              ]}
            >
              {page}
            </TextBody>
          </TouchableOpacity>
        ))}

        {shouldShowLastPage() && (
          <>
            {shouldShowRightEllipsis() && (
              <View style={styles.ellipsis}>
                <TextBody style={styles.ellipsisText}>...</TextBody>
              </View>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePageChange(totalPages)}
              disabled={disabled}
            >
              <TextBody style={styles.buttonText}>{totalPages}</TextBody>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            styles.navButton,
            (currentPage === totalPages || disabled) && styles.disabledButton,
          ]}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
        >
          <TextBody
            style={[
              styles.buttonText,
              styles.navButtonText,
              (currentPage === totalPages || disabled) && styles.disabledText,
            ]}
          >
            Next
          </TextBody>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  paginationInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  paginationText: {
    fontSize: 14,
    color: colors.textColor2,
    fontWeight: "500",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 6,
    flexWrap: "wrap",
    minHeight: 50,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.bgColor,
    minWidth: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    paddingHorizontal: 12,
    minWidth: 70,
  },
  activeButton: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
  disabledButton: {
    backgroundColor: colors.emptyBgColor,
    borderColor: colors.borderColor,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeButtonText: {
    color: colors.bgColor,
  },
  disabledText: {
    color: colors.textColor2,
  },
  ellipsis: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 24,
  },
  ellipsisText: {
    fontSize: 14,
    color: colors.textColor2,
    fontWeight: "bold",
  },
});
