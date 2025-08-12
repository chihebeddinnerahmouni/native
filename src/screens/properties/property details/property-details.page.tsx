import React, { useMemo, useState } from "react";
import { Image, View } from "react-native";
import { MainLayout } from "../../../layout";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { noImagePlaceholder } from "../../../constants/constant";
import {
  useAvailabilities,
  useSingleProperty,
  useTargets,
} from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { TabsComponent } from "../../../components/ui/tabs.component";
import { PropertyGeneralComponent } from "../../../components/properties/property details/property-general.component";
import { propertyDetailsStyle } from "./property-details.style";
import { AmenitiesComponent } from "../../../components/properties/property details/amenities/property-amenities.component";
import { AvailabilitiesComponent } from "../../../components/properties/property details/availability/property-availability.component";
import { TargetsComponent } from "../../../components/properties/property details/targets/property-target.component";
import { DocumentsComponent } from "../../../components/properties/property details/documents/property-documents.component";
// import { RouteProp, useRoute } from "@react-navigation/native";

export enum EPropertyTabs {
  GENERAL = "General",
  AMENITIES = "Amenities",
  AVAILABILITY = "Availability",
  TARGETS = "Targets",
  MEDIA = "Media",
  DOCUMENTS = "Documents",
  NOTES = "Notes",
  COMPLIANCES = "Compliances",
  FACILITIES = "Facilities",
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
    title: EPropertyTabs.DOCUMENTS,
  },
  {
    title: EPropertyTabs.MEDIA,
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
    EPropertyTabs.DOCUMENTS
  );

  // const route =
  //   useRoute<
  //     RouteProp<{ PropertyDetails: { propertyId: string } }, "PropertyDetails">
  //   >();
  // const selectedPropertyId = route.params?.propertyId;
  const selectedPropertyId = "68973230d46a4ad48b02eec4";
  const param = useMemo(
    () => ({ propertyId: selectedPropertyId || "" }),
    [selectedPropertyId]
  );
  const { property, isLoading, propertyError } = useSingleProperty(param);
  const { availabilities } = useAvailabilities(param);
  const { targets } = useTargets(param);

  const propertyImageUrl = property?.images?.[0]?.fileKey;

  if (isLoading) return <LoadingScreen />;
  if (propertyError || !property) return <View>Error loading property</View>;

  return (
    <MainLayout HeaderLeft={<PageTitle2>Detail Property</PageTitle2>}>
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
        {selectedTab === EPropertyTabs.AVAILABILITY && (
          <AvailabilitiesComponent
            availabilities={availabilities}
            targets={targets}
            propertyId={selectedPropertyId}
          />
        )}
        {selectedTab === EPropertyTabs.TARGETS && (
          <TargetsComponent targets={targets} propertyId={selectedPropertyId} />
        )}
        {selectedTab === EPropertyTabs.DOCUMENTS && (
          <DocumentsComponent
            documents={property.files || []}
            propertyId={selectedPropertyId}
          />
        )}
      </View>
    </MainLayout>
  );
};
