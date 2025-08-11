import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AddAvailabilityDto,
  EAmenityType,
} from "../../../backend/casaikos-api";
import colors from "../../../constants/colors";
import { amenitiesList } from "../../../utils";
import { AmenityComponent } from "../../properties/amenity.component";
import {
  useAvailabilitiesMutation,
  usePropertiesMutation,
} from "../../../api-query/hooks";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AvailabilitySchema } from "../../../utils/validators/availability.validator";

type IProps = {
  propertyId: string;
  onDismiss?: () => void;
  from?: Date;
};

export enum EDurationType {
  SINGLE = "single",
  MULTIPLE = "multiple",
}

type FormValues = AddAvailabilityDto & { typeDuration: EDurationType };

export const AvailabilitiesForm = ({ propertyId, onDismiss, from }: IProps) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<FormValues>({
    resolver: yupResolver(AvailabilitySchema) as Resolver<FormValues>,
  });

  const { createAvailabilities, isCreateLoading } = useAvailabilitiesMutation();
  const [typeDuration, setTypeDuration] = useState<EDurationType>(
    EDurationType.SINGLE
  );
  const ref = useRef(false);

  const onClickSubmit = () => {
    const values = getValues();
    createAvailabilities({
      ...values,
      to: typeDuration === EDurationType.SINGLE ? undefined : values.to,
      rate: Number(values.rate),
    })
      .then(() => {
        onDismiss?.();
      })
      .catch((error) => {
        // handleFormsServerErrors(error, setError, setFocus);
      });
  };

  if (!ref.current) {
    setValue("propertyId", propertyId ?? "");
    setValue("typeDuration", EDurationType.SINGLE);
    if (from) {
      setValue("from", from.toISOString().split("T")[0]);
    }
    ref.current = true;
  }

  return (
    <FormContainer>
      <View style={styles.container}>
        {/* <View style={styles.amenitiesList}>
        {amenitiesList?.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity.title);
          return (
            <TouchableOpacity
              key={amenity.title}
              style={[
                styles.amenityContainer,
                isSelected ? styles.selectedAmenity : styles.unselectedAmenity,
              ]}
              onPress={() => toggleAmenity(amenity.title)}
              activeOpacity={0.7}
            >
              <AmenityComponent
                amenity={amenity}
                styles={styles.amenityContent}
              />
            </TouchableOpacity>
          );
        })}
      </View> */}
        <FormActions onPress={() => onClickSubmit()} isLoading={false} />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  //   amenitiesList: {
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     gap: 8,
  //   },
  //   amenityContainer: {
  //     flex: 1,
  //     minWidth: "45%",
  //     maxWidth: "48%",
  //     borderRadius: 8,
  //     borderWidth: 1,
  //   },
  //   selectedAmenity: {
  //     opacity: 1,
  //     borderColor: colors.primaryColor,
  //     backgroundColor: colors.primaryLight,
  //   },
  //   unselectedAmenity: {
  //     opacity: 0.5,
  //     borderColor: colors.borderColor,
  //     backgroundColor: colors.bgColor,
  //   },
  //   amenityContent: {
  //     margin: 0,
  //     padding: 0,
  //   },
});
