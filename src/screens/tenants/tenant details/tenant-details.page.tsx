import React, { useState } from "react";
import { View } from "react-native";
import { MainLayout } from "../../../layout";
import {
  PageTitle2,
  TextBody,
} from "../../../components/ui/texts/Texts.component";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSingleOwner, useSingleTenant } from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { ErrorComponent } from "../../../components/ui/Error.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import {
  EntityType,
  ProfileIcon,
} from "../../../components/ui/Profile-icon.component";
import { InfoComp } from "../../../components/ui/info.component";
import { EmailIcon, PhoneIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { TabsComponent } from "../../../components/ui/tabs.component";
import { OwnerGeneralTab } from "../../../components/owners/owner details/owner-general.tab";
import { tenantDetailsStyle } from "./tenant-details.style";
import { OwnerPropertiesTab } from "../../../components/owners/owner details/owner-properties.tab";
import { OwnerDocumentsTab } from "../../../components/owners/owner details/owner-documents.tab";

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

export const TenantDetailsPage = () => {
  //   const route =
  //     useRoute<
  //       RouteProp<{ TenantDetails: { tenantId: string } }, "TenantDetails">
  //     >();
  //   const selectedTenantId = route.params?.tenantId;
  const selectedTenantId = "686a6bfe33547b8927dfc66a";
  const [selectedTab, setSelectedTab] = useState<string>(EOwnerTabs.PROPERTY);
  const { tenant, tenantError, isLoading } = useSingleTenant({
    tenantId: selectedTenantId || "",
  });

  if (isLoading) return <LoadingScreen />;
  if (tenantError || !tenant) return <ErrorComponent />;

  return (
    <MainLayout HeaderLeft={<PageTitle2>Owners</PageTitle2>}>
      <View style={tenantDetailsStyle.container}>
        <CardComponent style={tenantDetailsStyle.section}>
          <View style={tenantDetailsStyle.nameMessageContainer}>
            <View style={tenantDetailsStyle.nameContainer}>
              <ProfileIcon
                firstName={tenant.firstName}
                lastName={tenant.lastName}
                entity={EntityType.TENANT}
                size={24}
              />
              <TextBody style={tenantDetailsStyle.nameText} numberOfLines={1}>
                {tenant.firstName} {tenant.lastName}
              </TextBody>
            </View>
          </View>
          <InfoComp
            Icon={<EmailIcon color={colors.textColor2} />}
            value={tenant.email}
          />
          <InfoComp
            Icon={<PhoneIcon color={colors.textColor2} />}
            value={tenant.phoneNumber}
          />
          <TabsComponent
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            style={tenantDetailsStyle.tabsContainer}
          />
        </CardComponent>
        {/* {selectedTab === EOwnerTabs.GENERAL && (
          <OwnerGeneralTab owner={owner} />
        )}
        {selectedTab === EOwnerTabs.PROPERTY && (
          <OwnerPropertiesTab ownerId={selectedOwnerId} />
        )}
        {selectedTab === EOwnerTabs.DOCUMENTS && (
          <OwnerDocumentsTab
            documents={owner.files || []}
            ownerId={selectedOwnerId}
          />
        )} */}
      </View>
    </MainLayout>
  );
};
