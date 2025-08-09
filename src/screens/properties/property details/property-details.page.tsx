import React, { useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MainLayout } from "../../../layout";
import {
  PageTitle2,
  TextBody,
} from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { noImagePlaceholder } from "../../../constants/constant";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useSingleProperty } from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import colors from "../../../constants/colors";

enum EPropertyTabs {
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
  const [selectedTab, setSelectedTab] = useState<EPropertyTabs>(
    EPropertyTabs.GENERAL
  );

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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={propertyDetailsStyle.tabsScrollContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.title}
                onPress={() => setSelectedTab(tab.title)}
              >
                <TextBody
                  style={[
                    propertyDetailsStyle.tabText,
                    selectedTab === tab.title &&
                      propertyDetailsStyle.selectedTabText,
                  ]}
                >
                  {tab.title}
                </TextBody>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  tabsScrollContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textColor2,
  },
  selectedTabText: {
    color: colors.primaryColor,
  },
});
