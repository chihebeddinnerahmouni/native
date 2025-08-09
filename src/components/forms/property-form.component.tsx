import React, { useEffect, useState } from "react";
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
import { propertyTypesOptions, tenantTypesOptions } from "../../constants/data";
import { useUsers } from "../../api-query/hooks";
import { useOwners } from "../../api-query/hooks";
import { usePropertiesMutation } from "../../api-query/hooks";

// Form Components
import { FieldText } from "../ui/inputs/field-text/field-text.component";
import Select from "../ui/inputs/select.component";
import { FormContainer, FormRow } from "../ui/form/form-items.component";
import { TextFormSectionTitle } from "../ui/texts/Texts.component";
import { Textarea } from "../ui/inputs/field-text/textarea.component";
import { Stepper } from "../ui/stepper/stepper.component";
import { Button } from "../ui/buttons/button.component";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [createdProperty, setCreatedProperty] = useState<Property | null>(null);

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

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Step 1: Create new property OR update existing property
      const values = getValues();
      const airbnbId = extractAirBnbId(values.airbnbId?.trim() || "", "rooms");
      saveProperty({
        CreatePropertyDto: {
          ...values,
          airbnbId,
          priceYearly: values.isYearly ? Number(values.priceYearly) : undefined,
        } as CreatePropertyDto,
        selectedProperty,
      }).then((property) => {
        if (!selectedProperty) {
          setCreatedProperty(property);
        }
        setCurrentStep(2);
      });
    } else if (currentStep < 4) {
      const values = getValues();
      const propertyToUpdate = createdProperty || selectedProperty;

      if (propertyToUpdate) {
        saveProperty({
          CreatePropertyDto: values as CreatePropertyDto,
          selectedProperty: propertyToUpdate,
        }).then(() => {
          setCurrentStep(currentStep + 1);
        });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    const values = getValues();
    const propertyToUpdate = createdProperty || selectedProperty;

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

  const renderStep1 = () => (
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

      <TextFormSectionTitle style={styles.sectionTitle}>
        Rent Details
      </TextFormSectionTitle>

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
  );

  const renderStep2 = () => (
    <View style={styles.section}>
      <TextFormSectionTitle style={styles.sectionTitle}>
        Property Details
      </TextFormSectionTitle>

      <FormRow
        leftChildren={
          <Controller
            name="bathrooms"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Bathrooms Number"
                type="number"
                value={value?.toString()}
                onChangeText={(text) =>
                  onChange(text ? Number(text) : undefined)
                }
                error={errors.bathrooms}
              />
            )}
          />
        }
        rightChildren={
          <Controller
            name="parkingSpaces"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Parking Spaces"
                type="number"
                value={value?.toString()}
                onChangeText={(text) =>
                  onChange(text ? Number(text) : undefined)
                }
                error={errors.parkingSpaces}
              />
            )}
          />
        }
      />

      <FormRow
        leftChildren={
          <Controller
            name="yearBuilt"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Year Built"
                type="number"
                value={value?.toString()}
                onChangeText={(text) =>
                  onChange(text ? Number(text) : undefined)
                }
                error={errors.yearBuilt}
              />
            )}
          />
        }
        rightChildren={
          <Controller
            name="balconySize"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Balcony Size"
                type="number"
                value={value?.toString()}
                onChangeText={(text) =>
                  onChange(text ? Number(text) : undefined)
                }
                error={errors.balconySize}
              />
            )}
          />
        }
      />

      <TextFormSectionTitle style={styles.sectionTitle}>
        Tenant Information
      </TextFormSectionTitle>

      <FormRow
        leftChildren={
          <Controller
            name="tenantType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Select tenant type"
                label="Tenant Type"
                options={tenantTypesOptions}
                value={value}
                onChange={onChange}
                error={errors.tenantType}
              />
            )}
          />
        }
        rightChildren={
          <Controller
            name="maxTenants"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Max Tenants"
                type="number"
                value={value?.toString()}
                onChangeText={(text) =>
                  onChange(text ? Number(text) : undefined)
                }
                error={errors.maxTenants}
              />
            )}
          />
        }
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.section}>
      <TextFormSectionTitle style={styles.sectionTitle}>
        Address
      </TextFormSectionTitle>

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
                label="Postcode"
                value={value}
                onChangeText={onChange}
                error={errors.address?.zip}
              />
            )}
          />
        }
      />
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.section}>
      <TextFormSectionTitle style={styles.sectionTitle}>
        Platform Links
      </TextFormSectionTitle>

      <FormRow
        leftChildren={
          <Controller
            name="airbnbId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Airbnb Profile"
                value={value}
                onChangeText={onChange}
                error={errors.airbnbId}
              />
            )}
          />
        }
        rightChildren={
          <Controller
            name="bayutLink"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Bayut Link"
                value={value}
                onChangeText={onChange}
                error={errors.bayutLink}
              />
            )}
          />
        }
      />

      <FormRow
        leftChildren={
          <Controller
            name="dubizzleLink"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Dubizzle Link"
                value={value}
                onChangeText={onChange}
                error={errors.dubizzleLink}
              />
            )}
          />
        }
        rightChildren={
          <Controller
            name="propertyfinderLink"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label="Property Finder Link"
                value={value}
                onChangeText={onChange}
                error={errors.propertyfinderLink}
              />
            )}
          />
        }
      />
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stepper currentStep={currentStep} totalSteps={4} />

      <FormContainer>
        {renderCurrentStep()}

        <View style={styles.actionButtons}>
          {currentStep > 1 && (
            <Button
              variant="outlined"
              onPress={handlePrevStep}
              style={styles.prevButton}
            >
              Previous
            </Button>
          )}

          <Button
            onPress={
              currentStep === 1
                ? handleSubmit(handleNextStep)
                : currentStep === 4
                  ? handleSubmit(handleFinalSubmit)
                  : handleSubmit(handleNextStep)
            }
            loading={isSavePending}
            style={styles.nextButton}
          >
            {currentStep === 1
              ? "Create & Next"
              : currentStep === 4
                ? "Finish"
                : "Next"}
          </Button>
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
  sectionTitle: {
    // marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  prevButton: {
    flex: 1,
    marginRight: 6,
  },
  nextButton: {
    flex: 2,
    marginLeft: 6,
  },
});

export default PropertyForm;
