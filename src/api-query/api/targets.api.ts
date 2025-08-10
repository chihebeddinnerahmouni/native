import { AddTargetDto } from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

export const fetchTargets = async (propertyId: string) => {
  const { data } =
    await AxiosInstance.target.targetControllerFindAllByPropertyId(propertyId);
  return data;
};

export const createTargetHandler = async (body: AddTargetDto) => {
  const { data } = await AxiosInstance.target.targetControllerAddTarget(body);
  return data;
};

export const updateTargetHandler = async (
  targetId: string,
  body: AddTargetDto
) => {
  const { data } = await AxiosInstance.target.targetControllerUpdateById(
    targetId,
    body
  );
  return data;
};

export const deleteTargetHandler = async (targetId: string) => {
  const { data } =
    await AxiosInstance.target.targetControllerDeleteById(targetId);
  return data;
};
