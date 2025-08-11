import React, { useMemo, useState } from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Target } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import colors from "../../../../constants/colors";
import { ActionHeader } from "../../../ui/action-header.component";
import { Button } from "../../../ui/buttons/button.component";
import { PlusIcon } from "../../../../icons";
import { FieldText } from "../../../ui/inputs/field-text/field-text.component";
import { TargetCard } from "./target-card.component";

type IProps = {
  targets: Target[];
  propertyId: string;
};

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
          <FieldText
            value={String(selectedYear)}
            onChangeText={(text) => {
              const year = parseInt(text, 10);
              if (!isNaN(year)) {
                setSelectedYear(year);
              }
            }}
            type="number"
            style={targetsStyle.yearPicker}
            placeholder="Enter year"
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
