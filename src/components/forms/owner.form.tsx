import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateOwnerDto,
  EUserSelectFields,
  Owner,
} from "../../backend/casaikos-api";
import { honorificTitles } from "../../constants/data";
import { useOwnerMutation, useUsers } from "../../api-query/hooks";
import { FieldText } from "../ui/inputs/field-text/field-text.component";
import Select from "../ui/inputs/select.component";
import {
  FormActions,
  FormContainer,
  FormRow,
} from "../ui/form/form-items.component";
import { TextFormSectionTitle } from "../ui/texts/Texts.component";
import { ownerSchema } from "../../utils/validators/owners.validator";

type PropertyFormProps = {
  selectedOwner?: Owner;
  closeModal: () => void;
};

export const OwnerForm = ({ selectedOwner, closeModal }: PropertyFormProps) => {
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateOwnerDto>({
    resolver: yupResolver(ownerSchema),
  });

  const { saveOwner, isSaveLoading } = useOwnerMutation();
  const { usersResult } = useUsers({
    select: [EUserSelectFields.FirstName, EUserSelectFields.LastName],
  });

  const onClickSubmit = () => {
    const values = getValues();
    saveOwner({
      selectedOwner,
      ownerData: values,
    }).then(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (selectedOwner) {
      reset({
        ...selectedOwner,
        agentId: selectedOwner.agent?._id,
      });
    }
  }, [selectedOwner, reset]);

  return (
    <FormContainer>
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
      <View style={styles.section}>
        <TextFormSectionTitle>Personal Details</TextFormSectionTitle>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Title"
              label="Title"
              options={honorificTitles.map((el) => ({
                label: el,
                value: el,
              }))}
              error={errors.title}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <FormRow
          leftChildren={
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="First Name"
                  required
                  value={value}
                  onChangeText={onChange}
                  error={errors.firstName}
                />
              )}
            />
          }
          rightChildren={
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="Last Name"
                  required
                  value={value}
                  onChangeText={onChange}
                  error={errors.lastName}
                />
              )}
            />
          }
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FieldText
              placeholder="Enter here ..."
              label="Email"
              required
              value={value}
              onChangeText={onChange}
              error={errors.email}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FieldText
              placeholder="Enter here ..."
              label="Phone"
              required
              value={value}
              onChangeText={onChange}
              error={errors.phoneNumber}
            />
          )}
        />
      </View>

      <View style={styles.actionButtons}>
        <FormActions
          isLoading={isSaveLoading}
          onPress={handleSubmit(onClickSubmit)}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
});
