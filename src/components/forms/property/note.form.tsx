import React from "react";
import { View, StyleSheet } from "react-native";
import { Property, CreateNotePropertyDto } from "../../../backend/casaikos-api";
import colors from "../../../constants/colors";
import { usePropertiesMutation } from "../../../api-query/hooks";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { noteSchema } from "../../../utils/validators/note.validator";
import * as DocumentPicker from "expo-document-picker";
import { convertToRNFile } from "../../../utils/files.utils";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";
import { Textarea } from "../../ui/inputs/field-text/textarea.component";
import { FileUpload } from "../../ui/upload-file.component";
import { TextBody } from "../../ui/texts/Texts.component";

type IProps = {
  property: Property;
  onDismiss?: () => void;
};

type IImages = DocumentPicker.DocumentPickerAsset;

export const NotesForm = ({ property, onDismiss }: IProps) => {
  const {
    getValues,
    handleSubmit,
    control,
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
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FieldText
            placeholder="Enter title ..."
            label="Title"
            required
            error={errors.title}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        name="text"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Textarea
            placeholder="Enter here ..."
            label="Note's text"
            required
            value={value}
            onChangeText={onChange}
            error={errors.text}
          />
        )}
      />
      <View>
        <FileUpload
          onUpload={handleFileChange}
          isLoading={false}
          onlyImages={true}
        />
        <TextBody style={styles.imagesLength}>
          {images && images.length > 0
            ? `${images.length} files selected`
            : "No files selected"}
        </TextBody>
      </View>
      <FormActions
        onPress={handleSubmit(onClickSubmit)}
        isLoading={isAddNotePending}
      />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  imagesLength: {
    marginTop: 8,
    color: colors.textColor,
  },
});
