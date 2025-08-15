import React from "react";
import { View } from "react-native";
import { MainLayout } from "../../../layout";
import {
  PageTitle2,
  TextBody,
} from "../../../components/ui/texts/Texts.component";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { PlusIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { bookingsListStyles } from "./bookings-list-styles";
import { useBookings } from "../../../api-query/hooks";
import { BookingsTemplate } from "./bookings.template";
import { bookingStatusList, preBookingStatusList } from "../../../utils";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { EBookingStatus } from "../../../backend/casaikos-api";

export enum EBookingsTabs {
  PRE_BOOKINGS = "preBookings",
  BOOKINGS = "bookings",
}

export const BookingsListPage = () => {
  const [activeTab, setActiveTab] = React.useState<EBookingsTabs>(
    EBookingsTabs.PRE_BOOKINGS
  );
  const [activeStatus, setActiveStatus] = React.useState<EBookingStatus>(
    EBookingStatus.INITIAL
  );

  const { bookingsResult, isLoading } = useBookings({
    // filter: {
    //   cities: commaSeparatedToArray(cities),
    //   date: date ?? undefined,
    //   tenantIds: commaSeparatedToArray(tenants),
    //   propertyIds: commaSeparatedToArray(properties),
    //   agentsIds: commaSeparatedToArray(agents),
    // },
    // ...(isRowSwitch && {
    //   sort: {
    //     sortBy,
    //     sortDirection,
    //   },
    // }),
  });

  if (isLoading) return <LoadingScreen />;

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
      <BookingsTemplate
        type={activeTab}
        bookingsList={bookingsResult.items}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        bookingStatusList={
          activeTab === EBookingsTabs.PRE_BOOKINGS
            ? preBookingStatusList
            : bookingStatusList
        }
      />
    </MainLayout>
  );
};
