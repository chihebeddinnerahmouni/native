import React, { useRef, useState } from "react";
import { AddAvailabilityDto } from "../../../backend/casaikos-api";
import { useAvailabilitiesMutation } from "../../../api-query/hooks";
import {
  FormActions,
  FormContainer,
  FormRow,
} from "../../ui/form/form-items.component";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AvailabilitySchema } from "../../../utils/validators/availability.validator";
import { RadioGroup } from "../../ui/inputs/radio.component";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";

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
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    // setError,
    // setFocus,
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
    }).then(() => {
      onDismiss?.();
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
      <RadioGroup
        name="Availability Type"
        options={[
          {
            label: "Single Day",
            value: EDurationType.SINGLE,
          },
          {
            label: "Multiple Day",
            value: EDurationType.MULTIPLE,
          },
        ]}
        onChange={(value) => {
          setValue("typeDuration", value as EDurationType);
          setTypeDuration(value as EDurationType);
        }}
        value={typeDuration}
        error={errors.typeDuration}
      />
      <FormRow
        leftChildren={
          <Controller
            name="from"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                placeholder="Enter here ..."
                label={typeDuration === "multiple" ? "From" : "Date"}
                required
                type="date"
                register={register("from", { required: true })}
                error={errors.from}
                min={new Date().toISOString().split("T")[0]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        }
        rightChildren={
          typeDuration === "multiple" && (
            <Controller
              name="to"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FieldText
                  placeholder="Enter here ..."
                  label={typeDuration === "multiple" ? "to" : "Date"}
                  required
                  type="date"
                  register={register("to", { required: true })}
                  error={errors.to}
                  min={new Date().toISOString().split("T")[0]}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          )
        }
      />
      <Controller
        name="to"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FieldText
            placeholder="Enter here ..."
            label="Rate (per Day)"
            required
            type="currency"
            register={register("rate", { required: true })}
            error={errors.rate}
            min={0}
            value={value?.toString() ?? ""}
            onChangeText={(text) => {
              const numericValue = parseFloat(text.replace(/[^0-9.-]+/g, ""));
              onChange(isNaN(numericValue) ? "" : numericValue.toString());
            }}
          />
        )}
      />
      <FormActions
        onPress={() => handleSubmit(onClickSubmit)}
        isLoading={isCreateLoading}
      />
    </FormContainer>
  );
};
