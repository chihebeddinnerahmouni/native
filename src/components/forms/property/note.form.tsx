import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Property,
  EAmenityType,
  CreateNotePropertyDto,
} from "../../../backend/casaikos-api";
import colors from "../../../constants/colors";
import { amenitiesList } from "../../../utils";
import { AmenityComponent } from "../../properties/property details/amenities/amenity.component";
import { usePropertiesMutation } from "../../../api-query/hooks";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { noteSchema } from "../../../utils/validators/note.validator";
import * as DocumentPicker from "expo-document-picker";
import { convertToRNFile } from "../../../utils/files.utils";

type IProps = {
  property: Property;
  onDismiss?: () => void;
};

type IImages = DocumentPicker.DocumentPickerAsset;

export const NotesForm = ({ property, onDismiss }: IProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNotePropertyDto>({
    resolver: yupResolver(noteSchema),
  });
  const { addNote, isAddNotePending } = usePropertiesMutation();
  const [images, setImages] = React.useState<IImages[] | null>(null);

  const onClickSubmit = async () => {
    const values = getValues();
    if (!values.text.trim()) return;
    const rnFiles = convertToRNFile(images ?? []);
    addNote({
      propertyId: property._id,
      text: values.text,
      title: values.title,
      files: rnFiles,
    }).then(() => {
      onDismiss?.();
    });
  };

  const handleFileChange = async (files: IImages[]) => {
    setImages(files);
  };

  return (
    <FormContainer>
      <View style={styles.container}></View>
      <FormActions onPress={() => onClickSubmit()} isLoading={false} />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
