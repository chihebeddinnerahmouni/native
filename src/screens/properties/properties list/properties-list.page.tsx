import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PageTitle2 } from "../../../components/ui/texts/Texts.component";
import { MainLayout } from "../../../layout";
import { FilterIcon, PlusIcon, SearchIcon } from "../../../icons";
import { ActionHeader } from "../../../components/ui/action-header.component";
import { Button } from "../../../components/ui/buttons/button.component";

export const PropertiesListPage = () => {
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
    </MainLayout>
  );
};

const PropertiesListStyles = StyleSheet.create({
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
});
