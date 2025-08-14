import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateOwnerDto,
  EUserSelectFields,
  Owner,
} from "../../backend/casaikos-api";
import { honorificTitles, nationalities } from "../../constants/data";
import { useOwnerMutation, useUsers } from "../../api-query/hooks";
import { FieldText } from "../ui/inputs/field-text/field-text.component";
import Select from "../ui/inputs/select.component";
import {
  FormActions,
  FormContainer,
  FormRow,
  FormSection,
} from "../ui/form/form-items.component";
import { TextFormSectionTitle } from "../ui/texts/Texts.component";
import { ownerSchema } from "../../utils/validators/owners.validator";
import { DatePicker } from "../ui/inputs/date-picker.component";

type PropertyFormProps = {
  selectedOwner?: Owner;
  closeModal: () => void;
};

export const TenantsForm = ({
  selectedOwner,
  closeModal,
}: PropertyFormProps) => {
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
        bank: {
          bankName: "bankName*",
          accountName: "name*",
          accountNumber: "123456789*",
          iban: "DE89370400440532013000*",
          swiftCode: "DEUTDEDBFRA*",
        },
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
      <FormSection>
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
      </FormSection>
      <FormSection>
        <TextFormSectionTitle>Passport Details</TextFormSectionTitle>
        <FormRow
          leftChildren={
            <Controller
              name="passport.dateOfBirth"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholder="Enter here ..."
                  label="Date of Birth"
                  value={value ? new Date(value) : undefined}
                  onDateChange={(date) =>
                    onChange(date.toISOString().split("T")[0])
                  }
                  error={errors.passport?.dateOfBirth}
                />
              )}
            />
          }
          rightChildren={
            <Controller
              name="passport.placeOfBirth"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="Place of Birth"
                  value={value}
                  onChangeText={onChange}
                  error={errors.passport?.placeOfBirth}
                />
              )}
            />
          }
        />
        <FormRow
          leftChildren={
            <Controller
              name="passport.nationality"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Nationality"
                  label="Nationality"
                  options={nationalities.map((el) => ({
                    label: el,
                    value: el,
                  }))}
                  error={errors.passport?.nationality}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          }
          rightChildren={
            <Controller
              name="passport.passportNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="Passport Number"
                  value={value}
                  onChangeText={onChange}
                  error={errors.passport?.passportNumber}
                />
              )}
            />
          }
        />
        <FormRow
          leftChildren={
            <Controller
              name="passport.issueDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholder="Enter here ..."
                  label="Issue Date"
                  value={value ? new Date(value) : undefined}
                  onDateChange={(date) =>
                    onChange(date.toISOString().split("T")[0])
                  }
                  error={errors.passport?.issueDate}
                />
              )}
            />
          }
          rightChildren={
            <Controller
              name="passport.expiryDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholder="Enter here ..."
                  label="Expiry Date"
                  value={value ? new Date(value) : undefined}
                  onDateChange={(date) =>
                    onChange(date.toISOString().split("T")[0])
                  }
                  error={errors.passport?.expiryDate}
                />
              )}
            />
          }
        />
      </FormSection>
      <FormSection>
        <TextFormSectionTitle>Address Details</TextFormSectionTitle>
        <Controller
          name="address.street"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FieldText
              placeholder="Enter here ..."
              label="Street Address"
              value={value}
              onChangeText={onChange}
              error={errors.address?.street}
            />
          )}
        />
        <FormRow
          leftChildren={
            <Controller
              name="address.district"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="District"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.district}
                />
              )}
            />
          }
          rightChildren={
            <Controller
              name="address.city"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="City"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.city}
                />
              )}
            />
          }
        />
        <FormRow
          leftChildren={
            <Controller
              name="address.country"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="Country"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.country}
                />
              )}
            />
          }
          rightChildren={
            <Controller
              name="address.zip"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="Postal Code"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.zip}
                />
              )}
            />
          }
        />
      </FormSection>
      <FormSection>
        <TextFormSectionTitle>Bank Details</TextFormSectionTitle>
        <Controller
          name="bank.bankName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FieldText
              placeholder="Enter here ..."
              label="Bank Name"
              required
              value={value}
              onChangeText={onChange}
              error={errors.bank?.bankName}
            />
          )}
        />
        <Controller
          name="bank.accountName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FieldText
              placeholder="Enter here ..."
              label="Account Name"
              required
              value={value}
              onChangeText={onChange}
              error={errors.bank?.accountName}
            />
          )}
        />
        <FormRow
          leftChildren={
            <Controller
              name="bank.accountNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="Account Number"
                  required
                  value={value}
                  onChangeText={onChange}
                  error={errors.bank?.accountNumber}
                />
              )}
            />
          }
          rightChildren={
            <Controller
              name="bank.iban"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label="IBAN"
                  required
                  value={value}
                  onChangeText={onChange}
                  error={errors.bank?.iban}
                />
              )}
            />
          }
        />
        <Controller
          name="bank.swiftCode"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FieldText
              placeholder="Enter here ..."
              label="SWIFT Code"
              required
              value={value}
              onChangeText={onChange}
              error={errors.bank?.swiftCode}
            />
          )}
        />
      </FormSection>

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
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
});
