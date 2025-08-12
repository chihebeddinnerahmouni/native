import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Property } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import { Button } from "../../../ui/buttons/button.component";
import { PlusIcon } from "../../../../icons";
import colors from "../../../../constants/colors";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { useModal } from "../../../../contexts";
import { AmenitiesForm } from "../../../forms/property/amenities.form";
import { NoteItem } from "./note.component";

type IProps = {
  property: Property;
};

export const NotesComponent = ({ property }: IProps) => {
  const { openModal, closeModal } = useModal();

  const onClickOpenForm = (property: Property) => {
    openModal({
      title: "Update Amenities",
      component: (
        <AmenitiesForm property={property} onDismiss={() => closeModal()} />
      ),
    });
  };

  return (
    <>
      <CardComponent>
        <View>
          <ActionHeader
            title="Notes"
            styles={notesStyle.actionsHeader}
            actions={
              <Button
                variant="contained"
                icon={<PlusIcon color={colors.bgColor} />}
                onPress={() => {
                  onClickOpenForm(property);
                }}
              >
                Add Notes
              </Button>
            }
          />
          <View style={notesStyle.notesList}>
            {property.notes && property.notes.length > 0 ? (
              property.notes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  propertyId={property._id}
                />
              ))
            ) : (
              <NoItemsFound message="No notes available" />
            )}
          </View>
        </View>
      </CardComponent>
    </>
  );
};

const notesStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  notesList: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
