import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { MainLayout } from "../../../layout";
import { FilterIcon, PlusIcon, SearchIcon } from "../../../icons";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { useProperties } from "../../../api-query/hooks/properties/useProperties.query";
import { PropertyCard } from "../../../components/ui/cards/property card/property-card.component";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { colors } from "../../../constants/colors";
import { PropertiesListStyles } from "./property-list.style";
import { useModal } from "../../../contexts";
import { Property } from "../../../backend/casaikos-api";
import { Pagination } from "../../../components/ui/pagination";
import { PropertyForm } from "../../../components/forms";

export const PropertiesListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(1); // Items per page

  const { openModal, closeModal } = useModal();
  const { propertiesResult, isLoading } = useProperties({
    pagination: {
      page: currentPage,
      pageSize,
    },
    // filter: {
    //   cities: commaSeparatedToArray(cities) ?? undefined,
    //   title: title ?? undefined,
    // },
    // sort: {
    //   sortBy,
    //   sortDirection,
    // },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onClickOpenForm = (property?: Property) => {
    openModal({
      title: property ? "Update Property" : "New Property",
      slideDirection: "right",
      component: (
        <PropertyForm selectedProperty={property} closeModal={closeModal} />
      ),
      onDismiss: () => {
        // console.log("Modal dismissed");
      },
    });
  };

  if (isLoading) return <LoadingScreen />;

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
      <Pagination
        currentPage={currentPage}
        totalPages={propertiesResult.pagesCount}
        onPageChange={handlePageChange}
        disabled={isLoading}
      />

      <View style={PropertiesListStyles.paginationInfo}>
        <Text style={PropertiesListStyles.paginationText}>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, propertiesResult.documentsCount)} of{" "}
          {propertiesResult.documentsCount} properties
        </Text>
      </View>

      <ActionHeader
        title="List Properties"
        actions={
          <Button
            variant="contained"
            icon={<PlusIcon color={colors.bgColor} />}
            onPress={() => {
              onClickOpenForm();
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
      </View>
    </MainLayout>
  );
};
