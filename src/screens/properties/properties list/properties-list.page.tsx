import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { MainLayout } from "../../../layout";
import { FilterIcon, PlusIcon, SearchIcon } from "../../../icons";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { useProperties } from "../../../api-query/hooks/properties/useProperties.query";
import { PropertyCard } from "../../../components/ui/cards";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { colors } from "../../../constants/colors";
import { PropertiesListStyles } from "./property-list.style";
import { useModal } from "../../../contexts";
import { Pagination } from "../../../components/ui/pagination";
import { PropertyForm } from "../../../components/forms";
import {
  EOrderDirection,
  EPropertySortFields,
  PropertyFilterDto,
} from "../../../backend/casaikos-api";
import { PropertiesFilter } from "./properties.filter";

const pageSize = 10;
const filterInitialState: PropertyFilterDto = {
  title: undefined,
  cities: undefined,
};

export const PropertiesListPage = () => {
  const { openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] =
    useState<PropertyFilterDto>(filterInitialState);

  const { propertiesResult, isLoading } = useProperties({
    pagination: {
      page: currentPage,
      pageSize,
    },
    filter: {
      cities: appliedFilters.cities,
      title: appliedFilters.title,
    },
    sort: {
      sortBy: EPropertySortFields.Title,
      sortDirection: EOrderDirection.Asc,
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (filters: PropertyFilterDto) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const filterHandler = () => {
    openModal({
      title: "Filter Owners",
      slideDirection: "bottom",
      component: (
        <PropertiesFilter
          initialFilters={appliedFilters}
          onApplyFilters={handleApplyFilters}
        />
      ),
    });
  };

  const onClickOpenForm = () => {
    openModal({
      title: "New Property",
      component: <PropertyForm closeModal={closeModal} />,
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
          <TouchableOpacity onPress={filterHandler}>
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
        pageSize={pageSize}
        totalItems={propertiesResult.documentsCount}
      />

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
          <PropertyCard key={property._id} property={property} />
        ))}
      </View>
    </MainLayout>
  );
};
