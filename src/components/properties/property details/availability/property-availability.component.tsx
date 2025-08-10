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
import AvailabilityCalendar from "./calendar.component";

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
          <TargetGroup monthlySummary={monthlySummary} />
        </View>
      </CardComponent>
      <CardComponent>
        <View>
          <ActionHeader
            title="Available appointments"
            styles={availabilitiesStyle.actionsHeader}
          />
          <TargetGroup monthlySummary={monthlySummary} />
          <AvailabilityCalendar
            weeksDay={[]}
            availabilities={availabilities}
            // onCreateAvailability={() => {}}
            // onRemoveAvailability={() => {}}
            // formatCurrency={() => {}}
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
