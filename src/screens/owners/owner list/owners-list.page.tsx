import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { MainLayout } from "../../../layout";
import { FilterIcon, PlusIcon } from "../../../icons";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { colors } from "../../../constants/colors";
import { ownersListStyles } from "./owners-list.style";
import { useModal } from "../../../contexts";
import { Pagination } from "../../../components/ui/pagination";
import { OwnerForm } from "../../../components/forms";
import { useOwners } from "../../../api-query/hooks";
import { OwnerCard } from "../../../components/ui/cards/owner card/owner.card";
import NoItemsFound from "../../../components/ui/noItemsFound";
import { OwnersFilter } from "./owners.filter";
import {
  EOrderDirection,
  EOwnerSortFields,
  OwnerFilterDto,
} from "../../../backend/casaikos-api";

const pageSize = 10;
// export interface IOwnerFilter {
//   name?: string;
//   cities?: string[];
// }
const filterInitialState: OwnerFilterDto = {
  name: undefined,
  cities: undefined,
};

export const OwnersListPage = () => {
  const { openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] =
    useState<OwnerFilterDto>(filterInitialState);

  const { ownersResult, isLoading } = useOwners({
    pagination: {
      page: currentPage,
      pageSize,
    },
    filter: {
      name: appliedFilters.name,
      cities: appliedFilters.cities,
    },
    sort: {
      sortBy: EOwnerSortFields.FirstName,
      sortDirection: EOrderDirection.Asc,
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (filters: OwnerFilterDto) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const onClickOpenForm = () => {
    openModal({
      title: "New Owner",
      component: <OwnerForm closeModal={closeModal} />,
    });
  };

  const filterHandler = () => {
    openModal({
      title: "Filter Owners",
      slideDirection: "bottom",
      component: (
        <OwnersFilter
          initialFilters={appliedFilters}
          onApplyFilters={handleApplyFilters}
        />
      ),
    });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <MainLayout
      HeaderLeft={<PageTitle2>Owners</PageTitle2>}
      HeaderRight={
        <View style={ownersListStyles.headerActions}>
          {/* <TouchableOpacity>
            <SearchIcon />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={filterHandler}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      }
      isBackButtonVisible={false}
    >
      <Pagination
        currentPage={currentPage}
        totalPages={ownersResult.pagesCount}
        onPageChange={handlePageChange}
        disabled={isLoading}
        pageSize={pageSize}
        totalItems={ownersResult.documentsCount}
      />

      <ActionHeader
        title="List Owners"
        actions={
          <Button
            variant="contained"
            icon={<PlusIcon color={colors.bgColor} />}
            onPress={() => {
              onClickOpenForm();
            }}
          >
            Add Owner
          </Button>
        }
      />

      <View style={ownersListStyles.ownersContainer}>
        {ownersResult.items.length ? (
          ownersResult.items.map((owner) => (
            <OwnerCard key={owner._id} owner={owner} />
          ))
        ) : (
          <NoItemsFound message="No owners found" />
        )}
      </View>
    </MainLayout>
  );
};
