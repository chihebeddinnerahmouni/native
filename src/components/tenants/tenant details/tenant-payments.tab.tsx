import React from "react";
import { TextTitle } from "../../ui/texts/Texts.component";
import {
  CardComponent,
  PaymentCard,
  PropertyMiniCardSkeleton,
} from "../../ui/cards";
import { StyleSheet } from "react-native";
import { useTenantPayments } from "../../../api-query/hooks";
import { borderBottomStyle } from "../../../styles";
import NoItemsFound from "../../ui/noItemsFound";
import { mockPayments } from "../../../mock/payments.mock";
type IProps = {
  tenantId: string;
};

export const TenantsPaymentsTab = ({ tenantId }: IProps) => {
  const { paymentsList, isLoading } = useTenantPayments({
    tenantId,
  });

  return (
    <CardComponent style={style.container}>
      <TextTitle numberOfLines={1} style={borderBottomStyle}>
        Tenant Bookings
      </TextTitle>
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <PropertyMiniCardSkeleton key={`skeleton-${index}`} />
        ))
      ) : mockPayments.length > 0 ? (
        mockPayments.map((payment) => (
          <PaymentCard key={payment._id} payment={payment} />
        ))
      ) : (
        <NoItemsFound message="No payments found for this tenant." />
      )}
    </CardComponent>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 12,
  },
});
