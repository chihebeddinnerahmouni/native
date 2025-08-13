import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreatePropertyDto,
  EOwnerSelectFields,
  EUserSelectFields,
  Property,
} from "../../backend/casaikos-api";
import { extractAirBnbId, propertySchema } from "../../utils";
import { propertyTypesOptions } from "../../constants/data";
import { useUsers } from "../../api-query/hooks";
import { useOwners } from "../../api-query/hooks";
import { usePropertiesMutation } from "../../api-query/hooks";
import { FieldText } from "../ui/inputs/field-text/field-text.component";
import Select from "../ui/inputs/select.component";
import {
  FormActions,
  FormContainer,
  FormRow,
} from "../ui/form/form-items.component";
import { TextFormSectionTitle } from "../ui/texts/Texts.component";
import { Textarea } from "../ui/inputs/field-text/textarea.component";

type PropertyFormProps = {
  selectedProperty?: Property;
  closeModal: () => void;
};

export const OwnerForm = ({
  selectedProperty,
  closeModal,
}: PropertyFormProps) => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(propertySchema),
  });

  const { usersResult } = useUsers({
    select: [EUserSelectFields.FirstName, EUserSelectFields.LastName],
  });

  const { ownersResult } = useOwners({
    select: [EOwnerSelectFields.FirstName, EOwnerSelectFields.LastName],
  });

  const { saveProperty, isLoading: isSavePending } = usePropertiesMutation();

  const handleFinalSubmit = () => {
    const values = getValues();
    const propertyToUpdate = selectedProperty;

    if (propertyToUpdate) {
      const airbnbId = extractAirBnbId(values.airbnbId?.trim() || "", "rooms");
      saveProperty({
        CreatePropertyDto: {
          ...values,
          airbnbId,
        } as CreatePropertyDto,
        selectedProperty: propertyToUpdate,
      }).then(() => {
        closeModal();
      });
    }
  };

  useEffect(() => {
    if (selectedProperty) {
      reset({
        ...selectedProperty,
        agentId: selectedProperty.agent?._id,
        ownerId: selectedProperty.owner?._id,
        isFurnished: selectedProperty.isFurnished ?? true,
      });
    } else {
      reset({
        isActive: true,
        isYearly: false,
        isFurnished: false,
      });
    }
  }, [selectedProperty, reset]);

  return (
    <ScrollView style={styles.container}>
      <FormContainer>
        <View style={styles.section}>
          <Controller
            name="agentId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Select agent"
                label="Agent"
                options={usersResult.items.map((el) => ({
                  label: el.firstName + " " + el.lastName,
                  value: el._id,
                }))}
                value={value}
                onChange={onChange}
                error={errors.agentId}
              />
            )}
          />

          <Controller
            name="ownerId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Select owner"
                label="Owner"
                options={ownersResult.items.map((el) => ({
                  label: el.firstName + " " + el.lastName,
                  value: el._id,
                }))}
                value={value}
                onChange={onChange}
                error={errors.ownerId}
              />
            )}
          />

          <TextFormSectionTitle>Property Details</TextFormSectionTitle>

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Title"
                required
                value={value}
                onChangeText={onChange}
                error={errors.title}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea
                placeholder="Enter here ..."
                label="Description"
                value={value}
                onChangeText={onChange}
                error={errors.description}
              />
            )}
          />

          <FormRow
            rightChildren={
              <Controller
                name="buildingName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Building Name"
                    required
                    value={value}
                    onChangeText={onChange}
                    error={errors.buildingName}
                  />
                )}
              />
            }
            leftChildren={
              <Controller
                name="propertyType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Enter here ..."
                    label="Property Type"
                    options={propertyTypesOptions}
                    value={value}
                    onChange={onChange}
                    error={errors.propertyType}
                    required
                  />
                )}
              />
            }
          />

          <FormRow
            rightChildren={
              <Controller
                name="bedrooms"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Bedrooms Number"
                    type="number"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.bedrooms}
                  />
                )}
              />
            }
            leftChildren={
              <Controller
                name="propertySize"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Property Size (Sqft)"
                    type="number"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.propertySize}
                  />
                )}
              />
            }
          />

          <TextFormSectionTitle>Rent Details</TextFormSectionTitle>

          <FormRow
            leftChildren={
              <Controller
                name="deposit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Deposit"
                    type="number"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.deposit}
                  />
                )}
              />
            }
            rightChildren={
              <Controller
                name="priceYearly"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Yearly Price"
                    type="number"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.priceYearly}
                  />
                )}
              />
            }
          />
        </View>

        <View style={styles.actionButtons}>
          <FormActions
            isLoading={isSavePending}
            onPress={handleSubmit(handleFinalSubmit)}
          />
        </View>
      </FormContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    gap: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
});
