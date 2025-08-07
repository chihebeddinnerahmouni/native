import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { MainLayout } from "../../../layout";
import { FilterIcon, PlusIcon, SearchIcon } from "../../../icons";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { useProperties } from "../../../api-query/hooks/properties/useProperties.query";
import { PropertyCard } from "../../../components/ui/cards/property card/property-card.component";

export const PropertiesListPage = () => {
  const { propertiesResult, isLoading } = useProperties({
    // pagination: {
    //   page: currentPage,
    //   pageSize,
    // },
    // filter: {
    //   cities: commaSeparatedToArray(cities) ?? undefined,
    //   title: title ?? undefined,
    // },
    // sort: {
    //   sortBy,
    //   sortDirection,
    // },
  });

  return (
    <MainLayout
      HeaderLeft={<PageTitle2>Properties</PageTitle2>}
      HeaderRight={
        <View style={PropertiesListStyles.headerActions}>
          <TouchableOpacity>
            <SearchIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      }
      isBackButtonVisible={false}
    >
      <ActionHeader
        title="List Properties"
        actions={
          <Button
            variant="outlined"
            type="secondary"
            icon={<PlusIcon />}
            onPress={() => {
              // Handle add property action
            }}
          >
            Add Property
          </Button>
        }
      />
      <View style={PropertiesListStyles.propertiesContainer}>
        {propertiesResult.items.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onPress={() => {
              // Handle property card press
            }}
          />
        ))}
        {propertiesResult.items.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onPress={() => {
              // Handle property card press
            }}
          />
        ))}
      </View>
    </MainLayout>
  );
};

const PropertiesListStyles = StyleSheet.create({
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  propertiesContainer: {
    // marginTop: 16,
    flex: 1,
    flexDirection: "column",
    // flexWrap: "wrap",
    gap: 12,
  },
});
