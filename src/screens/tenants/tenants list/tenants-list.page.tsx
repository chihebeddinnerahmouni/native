import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { MainLayout } from "../../../layout";
import { FilterIcon, PlusIcon } from "../../../icons";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { colors } from "../../../constants/colors";
import { tenantsListStyles } from "./tenants-list.style";
import { useModal } from "../../../contexts";
import { Pagination } from "../../../components/ui/pagination";
import { OwnerForm } from "../../../components/forms";
import { useTenants } from "../../../api-query/hooks";
import { TenantCard } from "../../../components/ui/cards";
import NoItemsFound from "../../../components/ui/noItemsFound";
import { TenantsFilter } from "./tenants.filter";
import {
  EOrderDirection,
  ETenantSortFields,
  TenantFilterDto,
} from "../../../backend/casaikos-api";

const pageSize = 10;

const filterInitialState: TenantFilterDto = {
  name: undefined,
  cities: undefined,
};

export const TenantsListPage = () => {
  const { openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] =
    useState<TenantFilterDto>(filterInitialState);

  const { tenantsResult, isLoading } = useTenants({
    pagination: {
      page: currentPage,
      pageSize,
    },
    filter: {
      name: appliedFilters.name,
      cities: appliedFilters.cities,
    },
    sort: {
      sortBy: ETenantSortFields.FirstName,
      sortDirection: EOrderDirection.Asc,
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (filters: TenantFilterDto) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const filterHandler = () => {
    openModal({
      title: "Filter Owners",
      slideDirection: "bottom",
      component: (
        <TenantsFilter
          initialFilters={appliedFilters}
          onApplyFilters={handleApplyFilters}
        />
      ),
    });
  };

  const onClickOpenForm = () => {
    openModal({
      title: "New Owner",
      component: <OwnerForm closeModal={closeModal} />,
    });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <MainLayout
      HeaderLeft={<PageTitle2>Owners</PageTitle2>}
      HeaderRight={
        <View style={tenantsListStyles.headerActions}>
          <TouchableOpacity onPress={filterHandler}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      }
      isBackButtonVisible={false}
    >
      <Pagination
        currentPage={currentPage}
        totalPages={tenantsResult.pagesCount}
        onPageChange={handlePageChange}
        disabled={isLoading}
        pageSize={pageSize}
        totalItems={tenantsResult.documentsCount}
      />

      <ActionHeader
        title="List Tenants"
        actions={
          <Button
            variant="contained"
            icon={<PlusIcon color={colors.bgColor} />}
            onPress={() => {
              onClickOpenForm();
            }}
          >
            Add Tenant
          </Button>
        }
      />

      <View style={tenantsListStyles.tenantsContainer}>
        {tenantsResult.items.length ? (
          tenantsResult.items.map((tenant) => (
            <TenantCard key={tenant._id} tenant={tenant} />
          ))
        ) : (
          <NoItemsFound message="No tenants found" />
        )}
      </View>
    </MainLayout>
  );
};
