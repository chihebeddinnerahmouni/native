import React from "react";
import { TextTitle } from "../../ui/texts/Texts.component";
import { CardComponent, PropertyMiniCard } from "../../ui/cards";
import { StyleSheet } from "react-native";
import { useOwnerProperties } from "../../../api-query/hooks";
import { borderBottomStyle } from "../../../styles/border-buttom.style";

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
      {propertiesList.map((property) => (
        <PropertyMiniCard key={property._id} property={property} />
      ))}
    </CardComponent>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 12,
  },
});
