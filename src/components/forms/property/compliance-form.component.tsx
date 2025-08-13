/* eslint-disable @typescript-eslint/no-explicit-any */
import { Compliance, ComplianceDto } from "../../../backend/casaikos-api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { complianceSchema } from "../../../utils/validators/compliance.validator";
import { useCompliancesMutation } from "../../../api-query/hooks/compliances/useCompliancesMutation.query";
import { useEffect } from "react";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { FieldText } from "../../ui/inputs/field-text/field-text.component";

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
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComplianceDto>({
    resolver: yupResolver(complianceSchema as any),
    defaultValues: {
      warningDaysBeforeExpiry: 15,
    },
  });

  const onClickSubmit = async () => {
    updateCompliance({
      propertyId,
      values: {
        ...getValues(),
        warningDaysBeforeExpiry: Number(getValues().warningDaysBeforeExpiry),
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

  return (
    <FormContainer>
      <FieldText
        register={register("startDate")}
        type="date"
        label="Start date"
        error={errors.startDate}
      />
      <FieldText
        register={register("endDate")}
        type="date"
        label="End date"
        error={errors.endDate}
      />
      {/* <Select
        placeholder="Select compliance status"
        label="Compliance Status"
        options={complianceStatus.map((status) => ({
          label: getStatus(status).label,
          value: status,
        }))}
        register={register('status')}
        error={errors.status}
        withoutChip
        control={control}
        // onChange={(value) => {
        //   if (data?.status === 'expired') {
        //     return toast.error(
        //       'Cannot update compliance with status "expired"',
        //     );
        //   }
        // }}
      /> */}
      <FieldText
        register={register("warningDaysBeforeExpiry")}
        type="number"
        label="Warning days before expiry"
        error={errors.warningDaysBeforeExpiry}
      />

      <FormActions
        onPress={handleSubmit(onClickSubmit)}
        isLoading={isLoading}
      />
    </FormContainer>
  );
};
