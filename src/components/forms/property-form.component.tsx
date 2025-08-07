import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreatePropertyDto,
  EOwnerSelectFields,
  EUserSelectFields,
  Property,
} from "../../backend/casaikos-api";
import { extractAirBnbId, propertySchema } from "../../utils";
import { propertyTypesOptions, tenantTypesOptions } from "../../constants/data";
import { useUsers } from "../../api-query/hooks";
import { useOwners } from "../../api-query/hooks";
import { usePropertiesMutation } from "../../api-query/hooks";

// Form Components
import { FieldText } from "../ui/inputs/field-text/field-text.component";
import { Button } from "../ui/buttons/button.component";
import Select from "../ui/inputs/select.component";
import { FormContainer, FormRow } from "../ui/form/form-items.component";
import { TextFormSectionTitle } from "../ui/texts/Texts.component";
import { Textarea } from "../ui/inputs/field-text/textarea.component";
// import { Select } from "../ui/Select";
// import { Textarea } from "../ui/Textarea";
// import { RadioGroup } from "../ui/RadioGroup";
// import { Button } from "../ui/Button";
// import { TitleCard } from "../ui/TitleCard";
// import { FormContainer } from "../ui/FormContainer";

type PropertyFormProps = {
  selectedProperty?: Property;
  closeModal: () => void;
};

export const PropertyForm = ({
  selectedProperty,
  closeModal,
}: PropertyFormProps) => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(propertySchema),
  });

  const values = watch();

  const { usersResult } = useUsers({
    select: [EUserSelectFields.FirstName, EUserSelectFields.LastName],
  });

  const { ownersResult } = useOwners({
    select: [EOwnerSelectFields.FirstName, EOwnerSelectFields.LastName],
  });

  const { saveProperty, isLoading: isSavePending } = usePropertiesMutation();

  const onCancel = () => {
    closeModal();
  };

  const onClickSubmit = () => {
    const values = getValues();
    const airbnbId = extractAirBnbId(values.airbnbId?.trim() || "", "rooms");
    saveProperty({
      CreatePropertyDto: {
        ...values,
        airbnbId,
        priceYearly: values.isYearly ? Number(values.priceYearly) : undefined,
        isFurnished: values.isFurnished ?? false,
      } as CreatePropertyDto,
      selectedProperty,
    }).then(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (selectedProperty) {
      reset({
        ...selectedProperty,
        agentId: selectedProperty.agent?._id,
        ownerId: selectedProperty.owner?._id,
      });
    } else {
      reset({
        isActive: true,
        isYearly: true,
      });
    }
  }, [selectedProperty, reset]);

  return (
    <FormContainer>
      {/* <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
      {/* <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      > */}
      <Controller
        name="agentId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder="Select agent"
            required
            label="Agent"
            options={usersResult.items.map((el) => ({
              label: el.firstName + " " + el.lastName,
              value: el._id,
            }))}
            value={value}
            //   onValueChange={onChange}
            //   error={errors.agentId?.message}
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
            // onValueChange={onChange}
            // error={errors.ownerId?.message}
          />
        )}
      />

      <View style={styles.section}>
        <TextFormSectionTitle style={styles.sectionTitle}>
          Property Details
        </TextFormSectionTitle>
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
              //   error={errors.title?.message}
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
              //   error={errors.description?.message}
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
                  //   onValueChange={onChange}
                />
              )}
            />
          }
        />

        {/* <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Controller
                name="propertySize"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Property Size (Sqft)"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.propertySize?.message}
                  />
                )}
              />
          </View>

          <View style={styles.halfWidth}>
            <Controller
                name="bedrooms"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Bedrooms Number"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.bedrooms?.message}
                  />
                )}
              />
          </View>
        </View> */}
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
                  //   error={errors.bedrooms?.message}
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
                  //   error={errors.propertySize?.message}
                />
              )}
            />
          }
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="bathrooms"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Bathrooms Number"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.bathrooms?.message}
                  />
                )}
              /> */}
          </View>

          <View style={styles.halfWidth}>
            {/* <Controller
                name="parkingSpaces"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Parking Spaces"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.parkingSpaces?.message}
                  />
                )}
              /> */}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="yearBuilt"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Year Built"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.yearBuilt?.message}
                  />
                )}
              /> */}
          </View>

          <View style={styles.halfWidth}>
            {/* <Controller
                name="balconySize"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Balcony Size"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.balconySize?.message}
                  />
                )}
              /> */}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="tenantType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Enter here ..."
                    label="Tenant Type"
                    options={tenantTypesOptions}
                    value={value}
                    onValueChange={onChange}
                    error={errors.tenantType?.message}
                  />
                )}
              /> */}
          </View>

          <View style={styles.halfWidth}>
            {/* <Controller
                name="maxTenants"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Max tenants"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.maxTenants?.message}
                  />
                )}
              /> */}
          </View>
        </View>
      </View>

      {/* Rent Section */}
      {/* <TitleCard title="Rent" /> */}

      <View style={styles.section}>
        {/* <RadioGroup
            label="Active"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
            value={values.isActive}
            onChange={(value) => setValue("isActive", value)}
            error={errors.isActive?.message}
          />

          <RadioGroup
            label="Rent Type"
            options={[
              { label: "Yearly", value: true },
              { label: "Flexible", value: false },
            ]}
            value={values.isYearly}
            onChange={(value) => setValue("isYearly", value)}
            error={errors.isYearly?.message}
          /> */}

        {/* {values.isYearly && (
            <RadioGroup
              label="Furnished"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              value={values.isFurnished}
              onChange={(value) => setValue("isFurnished", value)}
              error={errors.isFurnished?.message}
            />
          )} */}

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="deposit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Deposit"
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={(text) =>
                      onChange(text ? Number(text) : undefined)
                    }
                    error={errors.deposit?.message}
                  />
                )}
              /> */}
          </View>

          {/* {values.isYearly && (
              <View style={styles.halfWidth}>
                <Controller
                  name="priceYearly"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FieldText
                      placeholder="Enter here ..."
                      label="Yearly Price"
                      keyboardType="numeric"
                      value={value?.toString()}
                      onChangeText={(text) =>
                        onChange(text ? Number(text) : undefined)
                      }
                      error={errors.priceYearly?.message}
                    />
                  )}
                />
              </View>
            )} */}
        </View>
      </View>

      {/* Address Section */}
      {/* <TitleCard title="Address" /> */}

      <View style={styles.section}>
        {/* <Controller
            name="address.street"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Street Address"
                value={value}
                onChangeText={onChange}
                error={errors.address?.street?.message}
              />
            )}
          /> */}

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="address.district"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="District"
                    value={value}
                    onChangeText={onChange}
                    error={errors.address?.district?.message}
                  />
                )}
              /> */}
          </View>

          <View style={styles.halfWidth}>
            {/* <Controller
                name="address.city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="City"
                    value={value}
                    onChangeText={onChange}
                    error={errors.address?.city?.message}
                  />
                )}
              /> */}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="address.country"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Select country"
                    label="Country"
                    value={value}
                    onChangeText={onChange}
                    error={errors.address?.country?.message}
                  />
                )}
              /> */}
          </View>

          <View style={styles.halfWidth}>
            {/* <Controller
                name="address.zip"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Postcode"
                    value={value}
                    onChangeText={onChange}
                    error={errors.address?.zip?.message}
                  />
                )}
              /> */}
          </View>
        </View>
      </View>

      {/* External Links Section */}
      {/* <TitleCard title="External links" /> */}

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="airbnbId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Airbnb Profile"
                    value={value}
                    onChangeText={onChange}
                    error={errors.airbnbId?.message}
                  />
                )}
              /> */}
          </View>

          <View style={styles.halfWidth}>
            {/* <Controller
                name="bayutLink"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Bayut link"
                    value={value}
                    onChangeText={onChange}
                    error={errors.bayutLink?.message}
                  />
                )}
              /> */}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {/* <Controller
                name="dubizzleLink"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Dubizzle link"
                    value={value}
                    onChangeText={onChange}
                    error={errors.dubizzleLink?.message}
                  />
                )}
              /> */}
          </View>

          <View style={styles.halfWidth}>
            {/* <Controller
                name="propertyfinderLink"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FieldText
                    placeholder="Enter here ..."
                    label="Property finder link"
                    value={value}
                    onChangeText={onChange}
                    error={errors.propertyfinderLink?.message}
                  />
                )}
              /> */}
          </View>
        </View>
      </View>

      {/* Form Actions */}
      <View style={styles.formActions}>
        <Button
          variant="outlined"
          onPress={onCancel}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          onPress={handleSubmit(onClickSubmit)}
          disabled={isSavePending}
          loading={isSavePending}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </View>
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  //   scrollView: {
  //     flex: 1,
  //   },
  section: {
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    // marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 24,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});

export default PropertyForm;
