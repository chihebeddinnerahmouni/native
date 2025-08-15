import React from "react";
import { FormActions, FormContainer } from "../../ui/form/form-items.component";
import { EBookingStatus } from "../../../backend/casaikos-api";
import { capitalizeText, statusFlowMap } from "../../../utils";
import Select from "../../ui/inputs/select.component";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingStatusSchema } from "../../../utils/validators/booking.validator";
import { useBookingMutation } from "../../../api-query/hooks";
import { Textarea } from "../../ui/inputs/field-text/textarea.component";

type IProps = {
  status: EBookingStatus | undefined;
  onDismiss: () => void;
  bookingId: string;
};

interface bookingStatusOption {
  note: string;
  newStatus: EBookingStatus;
}

export const BookingStatusForm = ({ status, onDismiss, bookingId }: IProps) => {
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<bookingStatusOption>({
    resolver: yupResolver(BookingStatusSchema),
  });
  const { updateBooking, isLoading } = useBookingMutation();
  const statusList = statusFlowMap[status ?? EBookingStatus.INITIAL] || [];

  const onClickSubmit = async () => {
    const values = getValues();
    await updateBooking({
      id: bookingId,
      requestDto: { note: values.note },
      newStatus: values.newStatus,
    }).then(() => {
      onDismiss();
    });
  };

  return (
    <FormContainer>
      <Controller
        name="newStatus"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder="Select status"
            label="Status"
            options={statusList.map((s) => ({
              label: capitalizeText(s),
              value: s,
            }))}
            value={value}
            onChange={onChange}
            error={errors.newStatus}
          />
        )}
      />
      <Controller
        name="note"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Textarea
            placeholder="Enter here ..."
            label="Note"
            value={value}
            onChangeText={onChange}
            error={errors.note}
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
