import React, { useMemo, useState } from "react";
import { Image, View } from "react-native";
import { MainLayout } from "../../../layout";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { noImagePlaceholder } from "../../../constants/constant";
import { useSingleProperty } from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { TabsComponent } from "../../../components/ui/tabs.component";
import { PropertyGeneralComponent } from "../../../components/properties/property details/property-general.component";
import { propertyDetailsStyle } from "./property-details.style";
import { AmenitiesComponent } from "../../../components/properties/property details/property-amenities.component";

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
  const [selectedTab, setSelectedTab] = useState<string>(
    EPropertyTabs.AMENITIES
  );

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
        {selectedTab === EPropertyTabs.GENERAL && (
          <PropertyGeneralComponent property={property} />
        )}
        {selectedTab === EPropertyTabs.AMENITIES && (
          <AmenitiesComponent property={property} />
        )}
      </View>
    </MainLayout>
  );
};
