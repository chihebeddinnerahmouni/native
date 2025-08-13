/* eslint-disable @typescript-eslint/no-explicit-any */
import { Compliance, ComplianceDto } from "../../../backend/casaikos-api";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { complianceSchema } from "../../../utils/validators/compliance.validator";
import { useCompliancesMutation } from "../../../api-query/hooks/compliances/useCompliancesMutation.query";
import { useEffect } from "react";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";
import { DatePicker } from "../../ui/inputs/date-picker.component";

type ComplianceFormProps = {
  selectedCompliance?: Compliance;
  onSuccess: () => void;
  propertyId: string;
};

export const ComplianceForm = ({
  selectedCompliance,
  onSuccess,
  propertyId,
}: ComplianceFormProps) => {
  const { updateCompliance, isLoading } = useCompliancesMutation();

  const {
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<ComplianceDto>({
    resolver: yupResolver(complianceSchema),
    defaultValues: {
      warningDaysBeforeExpiry: 15,
    },
  });

  const today = new Date();

  const onClickSubmit = async () => {
    const values = getValues();
    updateCompliance({
      propertyId,
      values: {
        ...values,
        warningDaysBeforeExpiry: Number(values.warningDaysBeforeExpiry),
      },
    }).then(() => {
      onSuccess();
    });
  };

  useEffect(() => {
    if (selectedCompliance) {
      reset({
        ...selectedCompliance,
        warningDaysBeforeExpiry:
          selectedCompliance.warningDaysBeforeExpiry || 15,
      });
    }
  }, [selectedCompliance, reset]);

  // console.log(errors);

  return (
    <FormContainer>
      <Controller
        name="startDate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            placeholder="Select date"
            label="Start date"
            required
            error={errors.startDate}
            minimumDate={today}
            value={value ? new Date(value) : undefined}
            onDateChange={(date) => onChange(date.toISOString().split("T")[0])}
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            placeholder="Select date"
            label="End date"
            required
            error={errors.endDate}
            minimumDate={today}
            value={value ? new Date(value) : undefined}
            onDateChange={(date) => onChange(date.toISOString().split("T")[0])}
          />
        )}
      />
      <Controller
        name="warningDaysBeforeExpiry"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FieldText
            type="number"
            label="Warning days before expiry"
            error={errors.warningDaysBeforeExpiry}
            placeholder="Enter warning days"
            value={value}
            onChangeText={(text) => onChange(text)}
            min={0}
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
