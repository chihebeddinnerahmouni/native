import React from "react";
import { StyleSheet, View } from "react-native";
import { MainLayout } from "../../layout";
import {
  PageTitle2,
  TextBody,
} from "../../components/ui/texts/Texts.component";
import { ActionHeader } from "../../components/ui/action-header.component";
import { Button } from "../../components/ui/buttons/button.component";
import { PlusIcon } from "../../icons";
import colors from "../../constants/colors";

enum EBookingsTabs {
  PRE_BOOKINGS = "preBookings",
  BOOKINGS = "bookings",
}

export const BookingsListPage = () => {
  const [activeTab, setActiveTab] = React.useState<EBookingsTabs>(
    EBookingsTabs.BOOKINGS
  );

  return (
    <MainLayout HeaderLeft={<PageTitle2>Bookings</PageTitle2>}>
      <ActionHeader
        title="List of Bookings"
        // styles={availabilitiesStyle.actionsHeader}
        actions={
          <Button
            variant="contained"
            icon={<PlusIcon color={colors.bgColor} />}
            // onPress={() => {
            //   onClickOpenForm();
            // }}
          >
            Add Booking
          </Button>
        }
      />
      <View style={bookingsListStyles.tabContainer}>
        <TextBody
          style={[
            bookingsListStyles.tab,
            activeTab === EBookingsTabs.PRE_BOOKINGS &&
              bookingsListStyles.activeTab,
          ]}
          onPress={() => setActiveTab(EBookingsTabs.PRE_BOOKINGS)}
        >
          Pre Bookings
        </TextBody>
        <TextBody
          style={[
            bookingsListStyles.tab,
            activeTab === EBookingsTabs.BOOKINGS &&
              bookingsListStyles.activeTab,
          ]}
          onPress={() => setActiveTab(EBookingsTabs.BOOKINGS)}
        >
          Bookings
        </TextBody>
      </View>
    </MainLayout>
  );
};

const bookingsListStyles = StyleSheet.create({
  tabContainer: {
    marginTop: 16,
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    color: colors.textColor,
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 8,
    fontWeight: "500",
    fontSize: 14,
  },
  activeTab: {
    color: colors.bgColor,
    backgroundColor: colors.primaryColor,
  },
});
