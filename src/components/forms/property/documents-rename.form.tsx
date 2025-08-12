import React, { useMemo } from "react";
import { HostedFile } from "../../../backend/casaikos-api";
import { usePropertyDocMutation } from "../../../api-query/hooks";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RenameDocumentValidator } from "../../../utils/validators/document.validator";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";

type IProps = {
  propertyId: string;
  onDismiss?: () => void;
  document: HostedFile;
};

export const RenameDocumentForm = ({
  propertyId,
  onDismiss,
  document,
}: IProps) => {
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<{ newName: string }>({
    resolver: yupResolver(RenameDocumentValidator),
  });

  const param = useMemo(() => {
    return { propertyId: propertyId ?? "" };
  }, [propertyId]);
  const { renamePropertyDoc, isRenamePending } = usePropertyDocMutation(param);

  const onClickSubmit = () => {
    const values = getValues();
    const newFileName = `${values.newName}`;
    renamePropertyDoc({
      fileKey: document.fileKey,
      newFileName: { newFileName },
    }).then(() => {
      onDismiss?.();
    });
  };

  return (
    <FormContainer>
      <FieldText
        placeholder="Enter here ..."
        label={`Old Name (${document.fileName?.split?.(".")?.[1]})`}
        required
        value={document.fileName?.split?.(".")?.[0] ?? ""}
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
        isLoading={isRenamePending}
      />
    </FormContainer>
  );
};
