import React, { useMemo, useState } from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Target } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import colors from "../../../../constants/colors";
import { ActionHeader } from "../../../ui/action-header.component";
import { Button } from "../../../ui/buttons/button.component";
import { PlusIcon } from "../../../../icons";
import { TargetCard } from "./target-card.component";
import Select from "../../../ui/inputs/select.component";

type IProps = {
  targets: Target[];
  propertyId: string;
};

const years = Array.from(
  { length: new Date().getFullYear() - 2015 + 1 },
  (_, i) => 2015 + i
);

export const TargetsComponent = ({ targets, propertyId }: IProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredTargets = useMemo(() => {
    return targets
      .filter((el) => {
        return el.yearNumber === selectedYear;
      })
      .sort(
        (a, b) =>
          new Date(a.monthNumber).getTime() - new Date(b.monthNumber).getTime()
      );
  }, [targets, selectedYear]);

  return (
    <>
      <CardComponent>
        <View>
          <ActionHeader
            title="Targets"
            styles={targetsStyle.actionsHeader}
            actions={
              <Button
                variant="contained"
                icon={<PlusIcon color={colors.bgColor} />}
                onPress={() => {
                  //   onClickOpenForm();
                }}
              >
                New Target
              </Button>
            }
          />
          <Select
            options={years.map((year) => ({
              label: String(year),
              value: year,
            }))}
            value={selectedYear}
            onChange={(item) => setSelectedYear(Number(item))}
            styles={targetsStyle.yearPicker}
          />
          <View style={targetsStyle.targetList}>
            {filteredTargets.map((el) => (
              <TargetCard key={el._id} target={el} />
            ))}
          </View>
        </View>
      </CardComponent>
    </>
  );
};

const targetsStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  yearPicker: {
    marginTop: 16,
  },
  targetList: {
    marginTop: 16,
    gap: 16,
  },
});
