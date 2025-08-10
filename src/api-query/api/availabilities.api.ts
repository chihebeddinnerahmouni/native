import {
  AddAvailabilityDto,
  DeleteAvailabilityDto,
} from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

export const fetchAvailabilities = async (propertyId: string) => {
  const { data } =
    await AxiosInstance.availability.availabilityControllerFindAllByPropertyId(
      propertyId
    );
  return data;
};

export const createAvailabilityHandler = async (body: AddAvailabilityDto) => {
  const { data } =
    await AxiosInstance.availability.availabilityControllerAddAvailability(
      body
    );
  return data;
};

export const deleteAvailabilityByIdHandler = async (id: string) => {
  const { data } =
    await AxiosInstance.availability.availabilityControllerDeleteById(id);
  return data;
};

export const deleteAvailabilityByRangeDateHandler = async (
  body: DeleteAvailabilityDto
) => {
  const { data } =
    await AxiosInstance.availability.availabilityControllerDeleteAvailabilityByRangeDate(
      body
    );
  return data;
};
