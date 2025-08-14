import React from "react";
import { HostedFile } from "../../backend/casaikos-api";
import { FormActions, FormContainer } from "../ui/form/form-items.component";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RenameDocumentValidator } from "../../utils/validators/document.validator";
import { FieldText } from "../ui/inputs/field-text/field-text.component";
import { RenameDocumentParams } from "../../types/rename-document-function.types";

type IProps = {
  onDismiss: () => void;
  file: HostedFile;
  renameDocument: (params: RenameDocumentParams) => void;
  isLoading: boolean;
};

export const RenameDocumentForm = ({
  onDismiss,
  file,
  renameDocument,
  isLoading,
}: IProps) => {
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<{ newName: string }>({
    resolver: yupResolver(RenameDocumentValidator),
  });

  const onClickSubmit = () => {
    const values = getValues();
    const newFileName = `${values.newName}`;
    renameDocument({
      fileKey: file.fileKey,
      newFileName,
      onSuccess: onDismiss,
    });
  };

  return (
    <FormContainer>
      <FieldText
        placeholder="Enter here ..."
        label={`Old Name (${file.fileName?.split?.(".")?.[1]})`}
        required
        value={file.fileName?.split?.(".")?.[0] ?? ""}
        disabled
      />
      <Controller
        name="newName"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FieldText
            placeholder="Enter here ..."
            label="New Name"
            required
            value={value}
            onChangeText={onChange}
            error={errors.newName}
          />
        )}
      />
      <FormActions
        onPress={handleSubmit(onClickSubmit)}
        isLoading={isLoading}
      />
    </FormContainer>
  );
};
