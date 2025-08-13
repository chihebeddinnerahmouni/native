import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";
import { facilitySchema } from "../../../utils/validators/facility.validator";

type FacilityFormData = {
  name: string;
};

type IProps = {
  propertyId: string;
  onDismiss?: () => void;
};

export const FacilityForm = ({ propertyId, onDismiss }: IProps) => {
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FacilityFormData>({
    resolver: yupResolver(facilitySchema),
  });

  const handleAddFacility = async () => {
    const values = getValues();
    console.log("Adding facility:", { propertyId, name: values.name });

    // Simulate API call
    try {
      // await addFacilityAPI({ propertyId, name: values.name });
      onDismiss?.();
    } catch (error) {
      console.error("Error adding facility:", error);
    }
  };

  return (
    <FormContainer>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FieldText
            label="Facility Name"
            placeholder="Enter facility name"
            value={value}
            onChangeText={onChange}
            error={errors.name}
            required
          />
        )}
      />

      <FormActions
        onPress={handleSubmit(handleAddFacility)}
        isLoading={false}
      />
    </FormContainer>
  );
};
