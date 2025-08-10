import React, { useMemo, useState } from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import {
  Availability,
  EAvailabilityStatus,
  Property,
  Target,
} from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { isDateInRangeForMonth } from "../../../../utils";
import { useModal } from "../../../../contexts";
import { AmenitiesForm } from "../../../forms/property/amenities.form";
import { TargetGroup } from "./targets.component";

type IProps = {
  availabilities: Availability[];
  targets: Target[];
};

export const AvailabilitiesComponent = ({
  availabilities,
  targets,
}: IProps) => {
  const { openModal, closeModal } = useModal();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const onClickOpenForm = (property: Property) => {
    openModal({
      title: "Update Amenities",
      slideDirection: "right",
      component: (
        <AmenitiesForm property={property} onDismiss={() => closeModal()} />
      ),
    });
  };

  const monthlySummary = useMemo(() => {
    const lastDayMonth = new Date(selectedYear, selectedMonth, 0);

    const availableDays = availabilities.filter((el) =>
      isDateInRangeForMonth(
        new Date(el.date),
        undefined,
        selectedMonth - 1,
        selectedYear
      )
    );

    const numberOfDays = lastDayMonth.getDate();

    const target = targets.find(
      (el) => el.monthNumber === selectedMonth && el.yearNumber === selectedYear
    )?.value;

    const rentedDays = availableDays.filter(
      (el) => el.status === EAvailabilityStatus.RENTED
    ).length;

    const revenue = availableDays
      .filter((el) => el.status === EAvailabilityStatus.RENTED)
      .reduce((acc, el) => acc + (el.rate || 0), 0);

    const rentedDaysPercentage = (rentedDays / numberOfDays) * 100;
    const availableDaysPercentage =
      ((numberOfDays - rentedDays) / numberOfDays) * 100;
    const revenuePercentage = target ? (revenue / target) * 100 : 0;

    return {
      numberOfDays,
      target,
      revenue,
      availableDays: availableDays.length,
      rentedDays,
      rentedDaysPercentage,
      availableDaysPercentage,
      revenuePercentage,
    };
  }, [availabilities, targets, selectedMonth, selectedYear]);

  return (
    <>
      <CardComponent>
        <View>
          <ActionHeader
            title="Availabilities"
            styles={availabilitiesStyle.actionsHeader}
            // actions={
            //   <Button
            //     variant="contained"
            //     icon={<EditIcon color={colors.bgColor} />}
            //     onPress={() => {
            //       onClickOpenForm(property);
            //     }}
            //   >
            //     Edit Amenities
            //   </Button>
            // }
          />
          <TargetGroup
            monthlySummary={monthlySummary}
            // formatCurrency={formatCurrency}
          />
        </View>
      </CardComponent>
    </>
  );
};

const availabilitiesStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
});

// React Native ProgressBar component
// interface ProgressBarProps {
//   value?: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ value = 0 }) => {
//   const getStatusColor = (val: number) => {
//     if (val < 30) return "#dc3545"; // danger
//     if (val < 100) return "#ffc107"; // warning
//     return "#28a745"; // success
//   };

//   return (
//     <View style={styles.progressContainer}>
//       <View style={styles.progressTrack}>
//         <View
//           style={[
//             styles.progressBar,
//             {
//               width: `${Math.ceil(value)}%`,
//               backgroundColor: getStatusColor(value),
//             },
//           ]}
//         />
//       </View>
//       <TextBody style={styles.percentText}>{Math.ceil(value)}%</TextBody>
//     </View>
//   );
// };

// // Target Group Component
// interface MonthlySummary {
//   rentedDays: number;
//   availableDays: number;
//   numberOfDays: number;
//   revenue: number;
//   target?: number;
//   rentedDaysPercentage: number;
//   availableDaysPercentage: number;
//   revenuePercentage: number;
// }

// interface TargetGroupProps {
//   monthlySummary: MonthlySummary;
// }

// export const TargetGroup: React.FC<TargetGroupProps> = ({ monthlySummary }) => {
//   return (
//     <View style={styles.targetGroup}>
//       {/* Days rented */}
//       <View style={styles.targetContainer}>
//         <TextBody style={styles.title}>Days rented</TextBody>
//         <TextBody style={styles.numbers}>
//           <TextBody style={styles.green}>{monthlySummary.rentedDays}</TextBody>{" "}
//           / {monthlySummary.availableDays} days
//         </TextBody>
//         <ProgressBar value={monthlySummary.rentedDaysPercentage} />
//         <TextBody style={styles.revenue}>
//           {" "}
//           <TextBody style={styles.revenuePercent}>
//             {monthlySummary.revenue}%
//           </TextBody>{" "}
//           vs last month
//         </TextBody>
//       </View>

//       {/* Days available */}
//       <View style={styles.targetContainer}>
//         <TextBody style={styles.title}>Days available</TextBody>
//         <TextBody style={styles.numbers}>
//           <TextBody style={styles.green}>
//             {monthlySummary.availableDays}
//           </TextBody>{" "}
//           / {monthlySummary.numberOfDays} days
//         </TextBody>
//         <ProgressBar value={monthlySummary.availableDaysPercentage} />
//         <TextBody style={styles.revenue}>
//           {" "}
//           <TextBody style={styles.revenuePercent}>
//             {monthlySummary.revenue}%
//           </TextBody>{" "}
//           vs last month
//         </TextBody>
//       </View>

//       {/* Revenue / target */}
//       <View style={styles.targetContainer}>
//         <TextBody style={styles.title}>Revenue / target</TextBody>
//         <TextBody style={styles.numbers}>
//           <TextBody style={styles.green}>
//             {formatCurrency(monthlySummary.revenue)}
//           </TextBody>
//           / {formatCurrency(monthlySummary.target || 0)}
//         </TextBody>
//         <ProgressBar value={monthlySummary.revenuePercentage} />
//         <TextBody style={styles.revenue}>
//           {" "}
//           <TextBody style={styles.revenuePercent}>
//             {monthlySummary.revenue}%
//           </TextBody>{" "}
//           vs last month
//         </TextBody>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   targetGroup: {
//     flexDirection: "row",
//     gap: 13,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   targetContainer: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e5e7eb", // equivalent to var(--Gray-100)
//     backgroundColor: "#ffffff",
//   },
//   title: {
//     color: "#030f0f",
//     fontSize: 14,
//     fontWeight: "500",
//     lineHeight: 20,
//     marginBottom: 8,
//   },
//   numbers: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#030f0f",
//     marginBottom: 8,
//   },
//   green: {
//     color: "#10b981", // primary color equivalent
//   },
//   revenue: {
//     fontSize: 14,
//     fontWeight: "400",
//     color: "#030f0f",
//     marginTop: 8,
//   },
//   revenuePercent: {
//     color: "#3d9456",
//   },
//   // ProgressBar styles
//   progressContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginVertical: 4,
//   },
//   progressTrack: {
//     flex: 1,
//     height: 7,
//     backgroundColor: "#f3f4f6",
//     borderRadius: 3.5,
//     overflow: "hidden",
//   },
//   progressBar: {
//     height: "100%",
//     borderRadius: 3.5,
//   },
//   percentText: {
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#030f0f",
//     minWidth: 35,
//     textAlign: "right",
//   },
// });

// // export default TargetGroup;
