import React, { useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { MainLayout } from "../../../layout";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { noImagePlaceholder } from "../../../constants/constant";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useSingleProperty } from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { TabsComponent } from "../../../components/ui/tabs.component";

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

  const route =
    useRoute<
      RouteProp<{ PropertyDetails: { propertyId: string } }, "PropertyDetails">
    >();
  const selectedPropertyId = route.params?.propertyId;
  const param = useMemo(
    () => ({ propertyId: selectedPropertyId || "" }),
    [selectedPropertyId]
  );
  const { property, isLoading, propertyError } = useSingleProperty(param);
  const propertyImageUrl = property?.images?.[0]?.fileKey;

  if (isLoading) return <LoadingScreen />;
  if (propertyError) return <View>Error loading property</View>;

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
});
