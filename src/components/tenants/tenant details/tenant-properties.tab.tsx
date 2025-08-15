import React from "react";
import { TextTitle } from "../../ui/texts/Texts.component";
import {
  CardComponent,
  PropertyMiniCard,
  PropertyMiniCardSkeleton,
} from "../../ui/cards";
import { StyleSheet } from "react-native";
import { useTenantBookings } from "../../../api-query/hooks";
import { borderBottomStyle } from "../../../styles";
import NoItemsFound from "../../ui/noItemsFound";

type IProps = {
  tenantId: string;
};

export const TenantsPropertiesTab = ({ tenantId }: IProps) => {
  const { bookingsList, isLoading } = useTenantBookings({
    tenantId: tenantId,
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
      ) : bookingsList.length > 0 ? (
        bookingsList.map((booking) => (
          <PropertyMiniCard key={booking._id} property={booking.property} />
        ))
      ) : (
        <NoItemsFound message="No bookings found for this tenant." />
      )}
    </CardComponent>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 12,
  },
});
