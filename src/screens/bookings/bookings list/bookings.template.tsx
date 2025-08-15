import React from "react";
import { ScrollView, View } from "react-native";
import { Booking, EBookingStatus } from "../../../backend/casaikos-api";
import { EBookingsTabs } from "./bookings-list.page";
import { bookingsListStyles } from "./bookings-list-styles";
import { TextBody } from "../../../components/ui/texts/Texts.component";
import { TouchableOpacity } from "react-native";

type IProps = {
  bookingsList: Booking[];
  type: EBookingsTabs;
  activeStatus: EBookingStatus;
  setActiveStatus: (status: EBookingStatus) => void;
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
  bookingStatusList,
}: IProps) => {
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
    </View>
  );
};
