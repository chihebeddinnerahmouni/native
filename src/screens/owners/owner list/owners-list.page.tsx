import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { MainLayout } from "../../../layout";
import { FilterIcon, PlusIcon, SearchIcon } from "../../../icons";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";
import { LoadingScreen } from "../../../components/ui/LoadingScreen";
import { colors } from "../../../constants/colors";
import { ownersListStyles } from "./owners-list.style";
import { useModal } from "../../../contexts";
import { Pagination } from "../../../components/ui/pagination";
import { PropertyForm } from "../../../components/forms";
import { useOwners } from "../../../api-query/hooks";
import { OwnerCard } from "../../../components/ui/cards/owner card/owner-card.component";
import NoItemsFound from "../../../components/ui/noItemsFound";

const pageSize = 1;

export const OwnersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { openModal, closeModal } = useModal();
  const { ownersResult, isLoading } = useOwners({
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
      HeaderLeft={<PageTitle2>Owners</PageTitle2>}
      HeaderRight={
        <View style={ownersListStyles.headerActions}>
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
        {ownersResult.items.length > 0 ? (
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
