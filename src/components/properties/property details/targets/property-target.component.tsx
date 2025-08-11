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
import { useModal } from "../../../../contexts";
import { TargetsForm } from "../../../forms/property/targets.form";

type IProps = {
  targets: Target[];
  propertyId: string;
};

export const targetYears = Array.from(
  { length: new Date().getFullYear() - 2015 + 1 },
  (_, i) => 2015 + i
);

export const TargetsComponent = ({ targets, propertyId }: IProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { openModal, closeModal } = useModal();

  const onClickCreate = () => {
    openModal({
      title: "New Target",
      component: (
        <TargetsForm
          propertyId={propertyId}
          onDismiss={() => {
            closeModal();
          }}
        />
      ),
    });
  };

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
                onPress={() => onClickCreate()}
              >
                New Target
              </Button>
            }
          />
          <Select
            options={targetYears.map((year) => ({
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
