import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Booking, EBookingStatus } from "../../../backend/casaikos-api";
import { EBookingsTabs } from "./bookings-list.page";
import { bookingsListStyles } from "./bookings-list-styles";
import { TextBody } from "../../../components/ui/texts/Texts.component";
import { TouchableOpacity } from "react-native";
import { postBookingStatus, preBookingStatus } from "../../../utils";
import { BookingCard } from "../../../components/ui/cards";

type IProps = {
  bookingsList: Booking[];
  type: EBookingsTabs;
  activeStatus: EBookingStatus;
  setActiveStatus: (status: EBookingStatus) => void;
  archivePages?: boolean;
  bookingStatusList: {
    label: string;
    value: EBookingStatus;
    isDraggableTo: boolean;
  }[];
};
export const BookingsTemplate = ({
  type,
  bookingsList,
  activeStatus,
  setActiveStatus,
  archivePages = false,
  bookingStatusList,
}: IProps) => {
  const filteredBookings = useMemo(() => {
    let result: Booking[] = [];
    switch (type) {
      case EBookingsTabs.PRE_BOOKINGS:
        result = bookingsList.filter((booking) => {
          return (
            booking.lastStatus?.value &&
            booking.isArchived === archivePages &&
            booking.lastStatus.value === activeStatus &&
            preBookingStatus.includes(
              booking.lastStatus.value as EBookingStatus
            )
          );
        });
        break;
      case EBookingsTabs.BOOKINGS:
        result = bookingsList.filter((booking) => {
          return (
            booking.lastStatus?.value &&
            booking.isArchived === archivePages &&
            booking.lastStatus.value === activeStatus &&
            postBookingStatus.includes(
              booking.lastStatus.value as EBookingStatus
            )
          );
        });
        break;
    }
    return result;
  }, [bookingsList, type, archivePages, activeStatus]);

  return (
    <View style={bookingsListStyles.bookingsSection}>
      <ScrollView
        style={bookingsListStyles.statusListContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={bookingsListStyles.statusListContainer}
      >
        {bookingStatusList.map((booking, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveStatus(booking.value)}
            style={[
              bookingsListStyles.statusItem,
              activeStatus === booking.value &&
                bookingsListStyles.activeStatusItem,
            ]}
          >
            <TextBody
              style={[
                bookingsListStyles.statusText,
                activeStatus === booking.value &&
                  bookingsListStyles.activeStatusText,
              ]}
            >
              {booking.label}
            </TextBody>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={bookingsListStyles.bookingsContainer}>
        {filteredBookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </View>
    </View>
  );
};
