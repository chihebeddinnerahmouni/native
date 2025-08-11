import React, { useEffect, useMemo, useState } from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import {
  Availability,
  EAvailabilityStatus,
  Target,
} from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import {
  getCalendarByMonthAndYear,
  isDateInRangeForMonth,
} from "../../../../utils";
import { TargetGroup } from "./targets.component";
import AvailabilityCalendar from "./calendar.component";
import Select from "../../../ui/inputs/select.component";
import { monthsList } from "../../../../constants/data";
import { FieldText } from "../../../ui/inputs/field-text/field-text.component";

type IProps = {
  availabilities: Availability[];
  targets: Target[];
};

export const AvailabilitiesComponent = ({
  availabilities,
  targets,
}: IProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [weeksDay, setWeeksDays] = useState<
    {
      day: number;
      isCurrentMonth: boolean;
      week: number;
      month: number;
      year: number;
    }[][]
  >([]);

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

  useEffect(() => {
    if (selectedYear && selectedMonth >= 0) {
      setWeeksDays(getCalendarByMonthAndYear(selectedMonth, selectedYear));
    }
  }, [selectedMonth, selectedYear]);

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
          <View style={availabilitiesStyle.datePickerContainer}>
            <Select
              placeholder="Select date"
              options={monthsList}
              value={selectedMonth}
              onChange={(value) => setSelectedMonth(Number(value))}
              flex={true}
            />
            <FieldText
              type="number"
              placeholder="Select Year"
              min={2000}
              onChangeText={(value) => {
                if (value.length <= 4) setSelectedYear(Number(value) ?? 2000);
              }}
              value={selectedYear}
              maxLength={4}
              flex={true}
            />
          </View>
          <AvailabilityCalendar
            weeksDay={weeksDay}
            availabilities={availabilities}
            onCreateAvailability={() => {}}
            // onRemoveAvailability={() => deleteAvailability(availability.id)}
            onViewRentedInfo={() => {}}
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
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
});
