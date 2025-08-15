/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Payment } from "../../../../backend/casaikos-api";
import colors from "../../../../constants/colors";
import { TextTitle } from "../../texts/Texts.component";
import {
  formatCurrency,
  formatDate,
  getRemainingDays,
} from "../../../../utils";
import { DotsIcon } from "../../../../icons";
import { IconLabelValue } from "../../icon-label-value.component";
import { Badge } from "../../badge.component";

type IProps = {
  payment: Payment;
};
export const PaymentCard = ({ payment }: IProps) => {
  if (!payment) return null;
  const remainingDays = getRemainingDays(payment.maximumDate);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <TextTitle numberOfLines={1}>{payment.status}</TextTitle>
        <TouchableOpacity>
          <DotsIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <IconLabelValue label="Type" value={payment.type} />
        <IconLabelValue label="Amount" value={formatCurrency(payment.amount)} />
        <IconLabelValue
          label="Due Date"
          value={formatDate(payment.maximumDate)}
        />
        <IconLabelValue
          label="Remaining Days"
          value={
            <Badge
              type={remainingDays <= 0 ? "danger" : "success"}
              text={`${remainingDays} days`}
            />
          }
        />
        <IconLabelValue
          label="Payment date"
          value={payment.paymentDate ? formatDate(payment.paymentDate) : "-"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    marginTop: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    padding: 8,
    backgroundColor: colors.emptyBgColor2,
    borderRadius: 8,
  },
});
