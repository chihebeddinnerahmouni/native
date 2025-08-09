import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { MainLayout } from "../../../layout";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { CardComponent } from "../../../components/ui/cards/card.component";
import { noImagePlaceholder } from "../../../constants/constant";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useSingleProperty } from "../../../api-query/hooks";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";

export const PropertyDetailsPage = () => {
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
        <CardComponent>
          <Image
            source={
              propertyImageUrl ? { uri: propertyImageUrl } : noImagePlaceholder
            }
            style={propertyDetailsStyle.imageContainer}
            resizeMode="cover"
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
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
  },
});
