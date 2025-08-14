import React from "react";
import { TextTitle } from "../../ui/texts/Texts.component";
import {
  CardComponent,
  PropertyMiniCard,
  PropertyMiniCardSkeleton,
} from "../../ui/cards";
import { StyleSheet } from "react-native";
import { useOwnerProperties } from "../../../api-query/hooks";
import { borderBottomStyle } from "../../../styles";
import NoItemsFound from "../../ui/noItemsFound";

type IProps = {
  ownerId: string;
};

export const OwnerPropertiesTab = ({ ownerId }: IProps) => {
  const { propertiesList, isLoading } = useOwnerProperties({
    ownerId: ownerId || "",
  });

  return (
    <CardComponent style={style.container}>
      <TextTitle numberOfLines={1} style={borderBottomStyle}>
        Owner Properties
      </TextTitle>
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <PropertyMiniCardSkeleton key={`skeleton-${index}`} />
        ))
      ) : propertiesList.length > 0 ? (
        propertiesList.map((property) => (
          <PropertyMiniCard key={property._id} property={property} />
        ))
      ) : (
        <NoItemsFound message="No properties found for this owner." />
      )}
    </CardComponent>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 12,
  },
});
