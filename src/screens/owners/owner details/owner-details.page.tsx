import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { MainLayout } from "../../../layout";
import {
  PageTitle2,
  TextBody,
} from "../../../components/ui/texts/Texts.component";
// import { RouteProp, useRoute } from "@react-navigation/native";
import { useSingleOwner } from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { ErrorComponent } from "../../../components/ui/Error.component";
import { StyleSheet } from "react-native";
import { CardComponent } from "../../../components/ui/cards/card.component";
import {
  EntityType,
  ProfileIcon,
} from "../../../components/ui/Profile-icon.component";
import { InfoComp } from "../../../components/ui/info.component";
import { EmailIcon, PhoneIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { TabsComponent } from "../../../components/ui/tabs.component";

export enum EOwnerTabs {
  GENERAL = "General",
  PROPERTY = "properties",
  DOCUMENTS = "documents",
}

const tabs = [
  {
    title: EOwnerTabs.GENERAL,
  },
  {
    title: EOwnerTabs.PROPERTY,
  },
  {
    title: EOwnerTabs.DOCUMENTS,
  },
];

export const OwnerDetailsPage = () => {
  //   const route =
  //     useRoute<
  //       RouteProp<{ OwnerDetails: { ownerId: string } }, "OwnerDetails">
  //     >();
  //   const selectedOwnerId = route.params?.ownerId;
  //   console.log(selectedOwnerId);
  const selectedOwnerId = "686913592d9385e4c7d8e2f1";
  const param = useMemo(
    () => ({ ownerId: selectedOwnerId || "" }),
    [selectedOwnerId]
  );
  const [selectedTab, setSelectedTab] = useState<string>(EOwnerTabs.GENERAL);
  const { owner, error, isLoading } = useSingleOwner(param);

  if (isLoading) return <LoadingScreen />;
  if (error || !owner) return <ErrorComponent />;

  return (
    <MainLayout HeaderLeft={<PageTitle2>Owners</PageTitle2>}>
      <CardComponent style={ownerDetailsStyle.section}>
        <View style={ownerDetailsStyle.nameMessageContainer}>
          <View style={ownerDetailsStyle.nameContainer}>
            <ProfileIcon
              firstName={owner.firstName}
              lastName={owner.lastName}
              entity={EntityType.OWNER}
              size={24}
            />
            <TextBody style={ownerDetailsStyle.nameText} numberOfLines={1}>
              {owner.firstName} {owner.lastName}
            </TextBody>
          </View>
        </View>
        <InfoComp
          Icon={<EmailIcon color={colors.textColor2} />}
          value={owner.email}
        />
        <InfoComp
          Icon={<PhoneIcon color={colors.textColor2} />}
          value={owner.phoneNumber}
        />
        <TabsComponent
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          style={ownerDetailsStyle.tabsContainer}
        />
      </CardComponent>
    </MainLayout>
  );
};

export const ownerDetailsStyle = StyleSheet.create({
  section: {
    flexDirection: "column",
    gap: 8,
  },
  nameMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "500",
  },
  tabsContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
});
