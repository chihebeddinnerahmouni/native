import React from "react";
import {
  View,
  // Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import colors from "../../../../constants/colors";
import { Availability } from "../../../../backend/casaikos-api";
import { useConfirmationAlert } from "../../../../hooks/useConfirmationAlert";
import ConfirmationModal from "../../../ui/modal/ConfirmationModal";
import { showInfoAlert } from "../../../ui/alerts/alerts.component";
import { useAvailabilitiesMutation } from "../../../../api-query/hooks";
import { TextBody } from "../../../ui/texts/Texts.component";

// Types
// interface Availability {
//   _id: string;
//   date: string;
//   status: EAvailabilityStatus;
//   rate?: number;
// }

enum EAvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  NOT_AVAILABLE = "NOT_AVAILABLE",
}

interface AvailabilityDay {
  day: number;
  isCurrentMonth: boolean;
  week: number;
  month: number;
  year: number;
}

interface AvailabilityCalendarProps {
  weeksDay: AvailabilityDay[][];
  availabilities: Availability[];
  onCreateAvailability: (day: Date) => void;
  onViewRentedInfo: (availability: Availability) => void;
}

// Constants
const daysTitleList = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 7 },
];

// Utility functions
const isDateIncluded = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

const getDayAvailabilityStatus = (availability?: Availability) => {
  if (!availability) {
    return {
      className: "free",
      label: "Free",
      value: null,
    };
  }

  switch (availability.status) {
    case EAvailabilityStatus.AVAILABLE:
      return {
        className: "available",
        label: "Available",
        value: EAvailabilityStatus.AVAILABLE,
      };
    case EAvailabilityStatus.RENTED:
      return {
        className: "rented",
        label: "Rented",
        value: EAvailabilityStatus.RENTED,
      };
    case EAvailabilityStatus.NOT_AVAILABLE:
      return {
        className: "not-available",
        label: "Not Available",
        value: EAvailabilityStatus.NOT_AVAILABLE,
      };
    default:
      return {
        className: "free",
        label: "Free",
        value: null,
      };
  }
};

const getRentedDayClasses = (
  days: AvailabilityDay[],
  availabilities: Availability[]
): string[] => {
  return days.map((day, index) => {
    const cellDate = new Date(Date.UTC(day.year, day.month - 1, day.day));
    const availability = availabilities.find((avail) =>
      isDateIncluded(cellDate, new Date(avail.date.split("T")[0]))
    );

    if (availability?.status !== EAvailabilityStatus.RENTED) {
      return "";
    }

    const prevDay = index > 0 ? days[index - 1] : null;
    const nextDay = index < days.length - 1 ? days[index + 1] : null;

    const prevDate = prevDay
      ? new Date(Date.UTC(prevDay.year, prevDay.month - 1, prevDay.day))
      : null;
    const nextDate = nextDay
      ? new Date(Date.UTC(nextDay.year, nextDay.month - 1, nextDay.day))
      : null;

    const prevRented = prevDate
      ? availabilities.find((avail) =>
          isDateIncluded(prevDate, new Date(avail.date.split("T")[0]))
        )?.status === EAvailabilityStatus.RENTED
      : false;

    const nextRented = nextDate
      ? availabilities.find((avail) =>
          isDateIncluded(nextDate, new Date(avail.date.split("T")[0]))
        )?.status === EAvailabilityStatus.RENTED
      : false;

    if (!prevRented && !nextRented) return "";
    if (!prevRented && nextRented) return "start-rent";
    if (prevRented && !nextRented) return "end-rent";
    if (prevRented && nextRented) return "middle-rent";

    return "";
  });
};

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  weeksDay,
  availabilities,
  onCreateAvailability,
}) => {
  const { showConfirmationAlert, modalState, hideModal } =
    useConfirmationAlert();
  const { deleteAvailabilityById } = useAvailabilitiesMutation();

  const onClickSlot = (day: AvailabilityDay, availability?: Availability) => {
    const selectedDay = new Date(Date.UTC(day.year, day.month - 1, day.day));

    if (!availability) {
      onCreateAvailability(selectedDay);
      return;
    }

    if (availability.status === EAvailabilityStatus.AVAILABLE) {
      showConfirmationAlert({
        title: "Remove Availability",
        message: "Are you sure you want to remove this availability?",
        confirmText: "Remove",
        onConfirm: async () => {
          await deleteAvailabilityById(availability._id);
        },
        useCustomModal: true,
        loadingText: "Removing...",
      });
      return;
    }

    if (availability.status === EAvailabilityStatus.RENTED) {
      showInfoAlert(
        "Rented Availability",
        "This slot is currently rented. You cannot modify it directly.\n\nPlease contact the tenant for more information or to make changes."
      );
    }
  };

  const today = new Date();

  const getStatusStyles = (status: string, positionClass: string) => {
    switch (status) {
      case "available":
        return [styles.dayContainer, styles.available];
      case "rented": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rentedStyles: any[] = [styles.dayContainer, styles.rented];
        if (positionClass === "start-rent") {
          rentedStyles.push(styles.startRent);
        }
        if (positionClass === "middle-rent") {
          rentedStyles.push(styles.middleRent);
        }
        if (positionClass === "end-rent") {
          rentedStyles.push(styles.endRent);
        }
        return rentedStyles;
      }
      case "not-available":
        return [styles.dayContainer, styles.notAvailable];
      default:
        return [styles.dayContainer, styles.free];
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {daysTitleList.map((day) => (
            <View key={day.value} style={styles.headerCell}>
              <TextBody style={styles.headerText}>{day.label}</TextBody>
            </View>
          ))}
        </View>

        {/* Calendar Body */}
        <View style={styles.body}>
          {weeksDay.map((days, weekIndex) => {
            const rentedClasses = getRentedDayClasses(days, availabilities);

            return (
              <View key={weekIndex} style={styles.row}>
                {days.map((day, dayIndex) => {
                  const cellDate = new Date(
                    Date.UTC(day.year, day.month - 1, day.day)
                  );

                  const isToday =
                    day.isCurrentMonth &&
                    cellDate.toDateString() === today.toDateString();

                  const availability = availabilities.find((avail) =>
                    isDateIncluded(cellDate, new Date(avail.date.split("T")[0]))
                  );

                  const dayAvailabilityStatus =
                    getDayAvailabilityStatus(availability);

                  const positionClass = rentedClasses[dayIndex] || "";

                  return (
                    <TouchableOpacity
                      key={`${day.day}-${dayIndex}`}
                      style={styles.cell}
                      onPress={() => onClickSlot(day, availability)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={getStatusStyles(
                          dayAvailabilityStatus.className,
                          positionClass
                        )}
                      >
                        {/* Day Number */}
                        <View style={styles.dayNumberContainer}>
                          <TextBody
                            style={[
                              styles.dayNumber,
                              isToday && styles.todayText,
                            ]}
                          >
                            {day.day}
                            {day.day === 1 &&
                              ` ${new Date(day.year, day.month - 1).toLocaleDateString("en", { month: "short" })}`}
                          </TextBody>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.rentedDot]} />
            <TextBody
              style={[styles.legendText, { color: colors.primaryColor }]}
            >
              Booked
            </TextBody>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.availableDot]} />
            <TextBody
              style={[styles.legendText, { color: colors.successColor }]}
            >
              Available
            </TextBody>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.notAvailableDot]} />
            <TextBody style={[styles.legendText, { color: colors.textColor2 }]}>
              Not Available
            </TextBody>
          </View>
        </View>
      </View>

      {/* Custom Confirmation Modal */}
      {modalState.visible && modalState.config && (
        <ConfirmationModal
          visible={modalState.visible}
          title={modalState.config.title}
          message={modalState.config.message}
          confirmText={modalState.config.confirmText}
          cancelText={modalState.config.cancelText}
          onConfirm={modalState.config.onConfirm}
          onCancel={() => {
            modalState.config?.onCancel?.();
            hideModal();
          }}
          loadingText={modalState.config.loadingText}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: "auto",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  headerCell: {
    width: 50,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    // borderRightWidth: 1,
    // borderRightColor: colors.borderColor,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textColor,
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 50,
    height: 50,
    // borderRightWidth: 1,
    // borderRightColor: colors.borderColor,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.borderColor,
    padding: 2,
  },
  dayContainer: {
    flex: 1,
    borderRadius: 10,
    position: "relative",
  },
  free: {
    // backgroundColor: colors.emptyBgColor2,
  },
  available: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.successColor,
  },
  rented: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  startRent: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: 1,
    marginRight: 0,
  },
  middleRent: {
    borderRadius: 0,
    margin: 0,
  },
  endRent: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginRight: 1,
    marginLeft: 0,
  },
  notAvailable: {
    backgroundColor: colors.emptyBgColor,
    borderWidth: 1,
    borderColor: colors.emptyBgColor,
  },
  dayNumberContainer: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dayNumber: {
    fontSize: 14,
    color: colors.textColor,
    textAlign: "center",
    fontWeight: "500",
  },
  todayText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 12,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  availableDot: {
    backgroundColor: colors.successColor,
  },
  rentedDot: {
    backgroundColor: colors.primaryColor,
  },
  notAvailableDot: {
    backgroundColor: colors.textColor2,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default AvailabilityCalendar;
