/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Booking } from "../../../backend/casaikos-api";
import colors from "../../../constants/colors";
import { TextBody } from "../texts/Texts.component";
import { noImagePlaceholder } from "../../../constants/constant";
import { PropertyLocation } from "../../properties/property-location.component";
import { PropertyIndicators } from "../../properties/property-indicators.component";
import { useNavigation } from "@react-navigation/native";
import {
  ERoute,
  EScreens,
  ETabs,
  formatDate,
  getBookingBadgeType,
} from "../../../utils";
import { getImageUrl } from "../../../utils/validators/images.utils";
import { IconLabelValue } from "../icon-label-value.component";
import { CalendarIcon, StatusIcon } from "../../../icons";
import { EntityType, ProfileIcon } from "../Profile-icon.component";
import { Badge } from "../badge.component";
import { useModal } from "../../../contexts";
import { BookingStatusForm } from "../../forms/bookings/booking-status.form";

type IProps = {
  booking: Booking | null;
};
export const BookingCard = ({ booking }: IProps) => {
  const navigator = useNavigation();
  const { openModal, closeModal } = useModal();

  if (!booking || !booking.property) return null;

  const propertyImageUrl = booking.property.images?.[0]?.fileKey;

  const navigationHandle = () => {
    (navigator as any).navigate(ETabs.MAIN, {
      screen: EScreens.BOOKINGS,
      params: {
        screen: ERoute.BOOKING_DETAILS,
        params: { propertyId: booking._id },
      },
    });
  };

  const statusHandler = () => {
    openModal({
      title: "Update Booking Status",
      slideDirection: "bottom",
      component: (
        <BookingStatusForm
          onDismiss={closeModal}
          status={booking.lastStatus?.value}
          bookingId={booking._id}
        />
      ),
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigationHandle}>
      <View style={styles.topContainer}>
        <Image
          source={
            propertyImageUrl
              ? { uri: getImageUrl(booking.property.images?.[0]) }
              : noImagePlaceholder
          }
          style={styles.image}
          defaultSource={noImagePlaceholder}
          resizeMode="cover"
        />
        <View style={styles.infosContainer}>
          <TextBody style={styles.title}>{booking.property.title}</TextBody>
          <PropertyLocation address={booking.property.address} />
          <PropertyIndicators property={booking.property} />
        </View>
      </View>
      {booking.lastStatus?.note && (
        <View style={styles.noteContainer}>
          <TextBody style={styles.noteTitle}>Note</TextBody>
          <TextBody style={styles.noteText}>
            {booking.lastStatus?.note} - by {booking.agent?.firstName}
            {booking.agent?.lastName}
          </TextBody>
        </View>
      )}
      <IconLabelValue
        icon={<CalendarIcon color={colors.textColor} />}
        label="Check-in"
        value={formatDate(booking.from)}
        styles={styles.checkItemDate}
      />
      <IconLabelValue
        icon={<CalendarIcon color={colors.textColor} />}
        label="Check-out"
        value={formatDate(booking.to)}
        styles={styles.checkItemDate}
      />
      <View style={styles.profileContainer}>
        <View style={styles.nameContainer}>
          <ProfileIcon
            firstName={booking.agent?.firstName}
            lastName={booking.agent?.lastName}
            entity={EntityType.TENANT}
            size={24}
          />
          <TextBody style={styles.tenantNameText}>
            {booking.tenant?.firstName} {booking.tenant?.lastName}
          </TextBody>
        </View>
        <View style={styles.nameContainer}>
          <CalendarIcon color={colors.textColor} />
          <TextBody style={styles.tenantNameText}>12/09/2025*</TextBody>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.nameContainer}>
          <StatusIcon color={colors.textColor} />
          <TextBody style={styles.statusTitle}>status</TextBody>
        </View>
        <TouchableOpacity onPress={statusHandler}>
          <Badge
            text={booking.lastStatus?.value || "Unknown"}
            type={getBookingBadgeType(booking.lastStatus?.value)}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  infosContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 75,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor,
  },
  noteContainer: {
    marginTop: 8,
    backgroundColor: colors.emptyBgColor2,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor,
  },
  noteText: {
    fontSize: 12,
    color: colors.textColor2,
    marginTop: 4,
  },
  checkItemDate: {
    marginTop: 12,
  },
  profileContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tenantNameText: {
    fontSize: 14,
    color: colors.textColor,
    fontWeight: "500",
  },
  statusContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusTitle: {
    fontSize: 14,
    color: colors.textColor,
  },
});
