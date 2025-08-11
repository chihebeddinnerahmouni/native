import React, { useEffect, useState } from "react";
import { AddTargetDto, Target } from "../../../backend/casaikos-api";
import { useTargetsMutation } from "../../../api-query/hooks";
import {
  FormActions,
  FormContainer,
  FormRow,
} from "../../ui/form/form-items.component";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RadioGroup } from "../../ui/inputs/radio.component";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";
import { TargetSchema } from "../../../utils/validators/targets.validator";
import { StyleSheet, View } from "react-native";
import Select from "../../ui/inputs/select.component";
import { monthsList } from "../../../constants/data";
import { targetYears } from "../../properties/property details/targets/property-target.component";

type IProps = {
  propertyId: string;
  onDismiss?: () => void;
  selectedTarget?: Target;
};

export enum EDurationType {
  SINGLE = "single",
  MULTIPLE = "multiple",
}

export const TargetsForm = ({
  propertyId,
  onDismiss,
  selectedTarget,
}: IProps) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    // setError,
    // setFocus,
    control,
    reset,
  } = useForm<AddTargetDto & { typeDuration: EDurationType }>({
    resolver: yupResolver(TargetSchema) as Resolver<
      AddTargetDto & { typeDuration: EDurationType }
    >,
  });

  const { createTarget, updateTarget, isLoading } = useTargetsMutation();
  const [typeDuration, setTypeDuration] = useState<EDurationType>(
    EDurationType.SINGLE
  );

  const onClickSubmit = () => {
    const values = getValues();

    const newValues: AddTargetDto = {
      propertyId: propertyId ?? "",
      value: Number(values.value),
      fromMonthNumber: Number(values.fromMonthNumber),
      fromYearNumber: Number(values.fromYearNumber),
      toMonthNumber: values.toMonthNumber
        ? Number(values.toMonthNumber)
        : undefined,
      toYearNumber: values.toYearNumber
        ? Number(values.toYearNumber)
        : undefined,
      weeklyDiscount: values.weeklyDiscount
        ? Number(values.weeklyDiscount)
        : undefined,
      monthlyDiscount: values.monthlyDiscount
        ? Number(values.monthlyDiscount)
        : undefined,
    };

    const targetRequest = selectedTarget
      ? updateTarget({
          targetId: selectedTarget._id,
          CreateTargetDto: {
            ...newValues,
          },
        })
      : createTarget(newValues);

    targetRequest
      .then(() => {
        onDismiss?.();
      })
      .catch(() => {
        // handleFormsServerErrors(error, setError, setFocus);
      });
  };

  useEffect(() => {
    if (selectedTarget) {
      reset({
        propertyId: propertyId ?? "",
        typeDuration: EDurationType.SINGLE,
        value: selectedTarget.value,
        fromMonthNumber: selectedTarget.monthNumber,
        fromYearNumber: selectedTarget.yearNumber,
        weeklyDiscount: selectedTarget.monthlyDiscount,
        monthlyDiscount: selectedTarget.monthlyDiscount,
      });
    } else {
      reset({
        propertyId: propertyId ?? "",
        typeDuration: EDurationType.SINGLE,
      });
    }
  }, [selectedTarget, reset, propertyId]);

  return (
    <FormContainer>
      <View style={targetFormStyle.container}>
        {!selectedTarget && (
          <RadioGroup
            name="Target Type"
            options={[
              {
                label: "Single Month",
                value: EDurationType.SINGLE,
              },
              {
                label: "Multiple Months",
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
        )}
        <FormRow
          leftChildren={
            <Select
              placeholder="Select month"
              options={monthsList}
              control={control}
              label={"From Month"}
              register={register("fromMonthNumber")}
              error={errors.fromMonthNumber}
            />
          }
          rightChildren={
            <Select
              placeholder="Select year"
              options={targetYears.map((year) => ({
                label: String(year),
                value: year,
              }))}
              control={control}
              label={"From Year"}
              register={register("fromYearNumber")}
              error={errors.fromYearNumber}
            />
          }
        />
        {!selectedTarget && typeDuration === "multiple" && (
          <FormRow
            leftChildren={
              <Select
                placeholder="Select month"
                options={monthsList}
                control={control}
                label={"To Month"}
                register={register("toMonthNumber")}
                error={errors.toMonthNumber}
              />
            }
            rightChildren={
              <Select
                placeholder="Select year"
                options={targetYears.map((year) => ({
                  label: String(year),
                  value: year,
                }))}
                control={control}
                label={"To Year"}
                register={register("toYearNumber")}
                error={errors.toYearNumber}
              />
            }
          />
        )}
      </View>
      <FormRow
        leftChildren={
          <Controller
            name="weeklyDiscount"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                label="Weekly Discount (%)"
                placeholder="Enter discount percentage"
                type="number"
                register={register("weeklyDiscount")}
                error={errors.weeklyDiscount}
                min={0}
                value={value}
                onChangeText={(text) => onChange(text)}
              />
            )}
          />
        }
        rightChildren={
          <Controller
            name="monthlyDiscount"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FieldText
                label="Monthly Discount (%)"
                placeholder="Enter discount percentage"
                type="number"
                register={register("monthlyDiscount")}
                error={errors.monthlyDiscount}
                min={0}
                value={value}
                onChangeText={(text) => onChange(text)}
              />
            )}
          />
        }
      />
      <Controller
        name="value"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FieldText
            placeholder="Enter target value"
            label="Target Value (per Month)"
            required
            type="currency"
            register={register("value")}
            error={errors.value}
            min={0}
            value={value?.toString() ?? ""}
            onChangeText={(text) => onChange(text)}
          />
        )}
      />
      <FormActions
        onPress={handleSubmit(onClickSubmit)}
        isLoading={isLoading}
      />
    </FormContainer>
  );
};

const targetFormStyle = StyleSheet.create({
  container: {
    gap: 16,
  },
});
