import React, { useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { MainLayout } from "../../../layout";
import {
  PageTitle2,
  TextBody,
  TextTitle,
} from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { noImagePlaceholder } from "../../../constants/constant";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useSingleProperty } from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { TabsComponent } from "../../../components/ui/tabs.component";
import { PropertyLocation } from "../../../components/properties/property-location.component";
import { PropertyIndicators } from "../../../components/properties/property-indicators.component";
import { IconLabelValue } from "../../../components/ui/icon-label-value.component";
import {
  BuildingIcon,
  EmailIcon,
  PropertyIcon,
  StatusIcon,
  UserIcon,
} from "../../../icons";
import { Badge } from "../../../components/ui/badge.component";

export enum EPropertyTabs {
  GENERAL = "GENERAL",
  AMENITIES = "AMENITIES",
  AVAILABILITY = "AVAILABILITY",
  TARGETS = "TARGETS",
  MEDIA = "MEDIA",
  DOCUMENTS = "DOCUMENTS",
  NOTES = "NOTES",
  COMPLIANCES = "COMPLIANCES",
  FACILITIES = "FACILITIES",
}

const tabs = [
  {
    title: EPropertyTabs.GENERAL,
  },
  {
    title: EPropertyTabs.AMENITIES,
  },
  {
    title: EPropertyTabs.AVAILABILITY,
  },
  {
    title: EPropertyTabs.TARGETS,
  },
  {
    title: EPropertyTabs.MEDIA,
  },
  {
    title: EPropertyTabs.DOCUMENTS,
  },
  {
    title: EPropertyTabs.NOTES,
  },
  {
    title: EPropertyTabs.COMPLIANCES,
  },
  {
    title: EPropertyTabs.FACILITIES,
  },
];

export const PropertyDetailsPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>(EPropertyTabs.GENERAL);

  //   const route =
  //     useRoute<
  //       RouteProp<{ PropertyDetails: { propertyId: string } }, "PropertyDetails">
  //     >();
  //   const selectedPropertyId = route.params?.propertyId;
  const selectedPropertyId = "68973230d46a4ad48b02eec4";
  const param = useMemo(
    () => ({ propertyId: selectedPropertyId || "" }),
    [selectedPropertyId]
  );
  const { property, isLoading, propertyError } = useSingleProperty(param);
  const propertyImageUrl = property?.images?.[0]?.fileKey;

  if (isLoading) return <LoadingScreen />;
  if (propertyError || !property) return <View>Error loading property</View>;

  return (
    <MainLayout HeaderLeft={<PageTitle2>detail Property</PageTitle2>}>
      <View style={propertyDetailsStyle.container}>
        <CardComponent havePadding={false}>
          <Image
            source={
              propertyImageUrl ? { uri: propertyImageUrl } : noImagePlaceholder
            }
            style={propertyDetailsStyle.imageContainer}
            resizeMode="cover"
          />
          <TabsComponent
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </CardComponent>

        <CardComponent>
          <View style={propertyDetailsStyle.section}>
            <TextTitle numberOfLines={1}>{property.title}</TextTitle>
            <PropertyLocation address={property.address} />
            <PropertyIndicators property={property} />
            {/* <TextBody>
              {property.description || "No description available."}
            </TextBody> */}
          </View>
        </CardComponent>

        <CardComponent>
          <View style={propertyDetailsStyle.section}>
            <TextTitle
              numberOfLines={1}
              style={propertyDetailsStyle.borderBottom}
            >
              Property Details
            </TextTitle>
            <IconLabelValue
              icon={<PropertyIcon />}
              label="Name"
              value={property.title || "-"}
            />
            <IconLabelValue
              icon={<EmailIcon />}
              label="Owner Email"
              value={property.owner?.email || "-"}
            />
            <IconLabelValue
              icon={<UserIcon />}
              label="Owner"
              value={
                property.owner?.firstName + " " + property.owner?.lastName ||
                "-"
              }
            />
            <IconLabelValue
              icon={<BuildingIcon />}
              label="Property Type"
              value={property.propertyType || "-"}
            />
            <IconLabelValue
              icon={<StatusIcon />}
              label="Status"
              value={<Badge type="success" text="Available*" />}
            />
          </View>
        </CardComponent>
      </View>
    </MainLayout>
  );
};

export const propertyDetailsStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
  },
  imageContainer: {
    width: "100%",
    height: 207,
    overflow: "hidden",
    objectFit: "cover",
  },
  section: {
    flexDirection: "column",
    gap: 12,
  },
  borderBottom: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
