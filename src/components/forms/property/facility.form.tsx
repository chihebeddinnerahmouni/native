import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { facilitySchema } from "../../../utils/validators/facility.validator";
import { Textarea } from "../../ui/inputs/field-text/textarea.component";
import { usePropertiesMutation } from "../../../api-query/hooks";
import { Property } from "../../../backend/casaikos-api";

type FacilityFormData = {
  text: string;
};

type IProps = {
  property: Property;
  onDismiss?: () => void;
};

export const FacilityForm = ({ property, onDismiss }: IProps) => {
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FacilityFormData>({
    resolver: yupResolver(facilitySchema),
  });
  const { addFacility, isAddFacilityPending } = usePropertiesMutation();

  const handleAddFacility = async () => {
    const values = getValues();

    addFacility({
      property,
      facility: values.text,
    }).then(() => {
      onDismiss?.();
    });
  };

  return (
    <FormContainer>
      <Controller
        name="text"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Textarea
            label="Facility Text"
            placeholder="Enter facility text"
            value={value}
            onChangeText={onChange}
            error={errors.text}
            required
          />
        )}
      />

      <FormActions
        onPress={handleSubmit(handleAddFacility)}
        isLoading={isAddFacilityPending}
      />
    </FormContainer>
  );
};
