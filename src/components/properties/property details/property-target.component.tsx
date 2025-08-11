import React, { useMemo, useState } from "react";
import { CardComponent } from "../../ui/cards/card.component";
import { Target } from "../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import colors from "../../../constants/colors";
import { ActionHeader } from "../../ui/action-header.component";
import { Button } from "../../ui/buttons/button.component";
import { PlusIcon } from "../../../icons";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

// You'll need to replace these with your actual icon components
import { EditIcon, DeleteIcon, WalletIcon } from "../../../icons";

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
              <TargetCard
                key={el._id}
                target={el}
                monthLabel={new Date(el.monthNumber).toLocaleString("default", {
                  month: "long",
                })}
                onEdit={(target) => {
                  // Handle edit action
                }}
                onDelete={(target) => {
                  // Handle delete action
                }}
                formatCurrency={(value) => `$${value.toFixed(2)}`}
              />
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

type TargetCardProps = {
  target: Target;
  monthLabel: string;
  onEdit: (target: Target) => void;
  onDelete: (target: Target) => void;
  formatCurrency: (value: number) => string;
  style?: ViewStyle;
};

export const TargetCard = ({
  target,
  monthLabel,
  onEdit,
  onDelete,
  formatCurrency,
  style,
}: TargetCardProps) => {
  return (
    <View style={[styles.targetItem, style]}>
      <View style={styles.targetItemHeader}>
        <Text style={styles.monthYearText}>
          {monthLabel} {target.yearNumber}
        </Text>
        <View style={styles.actionItems}>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => onEdit(target)}
            activeOpacity={0.7}
          >
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => onDelete(target)}
            activeOpacity={0.7}
          >
            <DeleteIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.targetItemPrice}>
        <WalletIcon />
        <Text style={styles.priceText}>{formatCurrency(target.value)}</Text>
      </View>

      <View style={styles.targetItemDiscountsContainer}>
        <TouchableOpacity style={styles.targetItemDiscount} activeOpacity={0.8}>
          <Text style={styles.discountTitle}>Weekly discount</Text>
          <View style={[styles.discountValue, styles.weeklyDiscount]}>
            <Text style={styles.weeklyDiscountText}>
              {target.weeklyDiscount ? `${target.weeklyDiscount}%` : "-"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.targetItemDiscount} activeOpacity={0.8}>
          <Text style={styles.discountTitle}>Monthly discount</Text>
          <View style={[styles.discountValue, styles.monthlyDiscount]}>
            <Text style={styles.monthlyDiscountText}>
              {target.monthlyDiscount ? `${target.monthlyDiscount}%` : "-"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  targetItem: {
    backgroundColor: colors.bgColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    padding: 8,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 0.5,
  },
  targetItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textColor,
  },
  actionItems: {
    flexDirection: "row",
    gap: 8,
  },
  actionIcon: {
    padding: 4,
  },
  targetItemPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  priceText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textColor,
  },
  targetItemDiscountsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 30,
  },
  targetItemDiscount: {
    backgroundColor: colors.emptyBgColor,
    padding: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    flex: 1,
    gap: 8,
  },
  discountTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textColor,
  },
  discountValue: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  weeklyDiscount: {
    backgroundColor: "rgba(250, 43, 55, 0.1)",
  },
  weeklyDiscountText: {
    color: colors.errorColor,
    fontSize: 12,
    fontWeight: "500",
  },
  monthlyDiscount: {
    backgroundColor: "rgba(61, 148, 86, 0.1)",
  },
  monthlyDiscountText: {
    color: colors.successColor,
    fontSize: 12,
    fontWeight: "500",
  },
});
