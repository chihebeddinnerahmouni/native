import {
  CreateOwnerDto,
  FetchOwnersDto,
  Owner,
  RenameFileDto,
} from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

// Fetch all owners
export const fetchOwners = async (options: FetchOwnersDto) => {
  const response = await AxiosInstance.owners.ownersControllerFindAll(options);
  return response.data;
};

export const getOwnerById = async (id: string) => {
  const response = await AxiosInstance.owners.ownersControllerFindById(id);
  return response.data;
};

export const createOwner = async (ownerData: CreateOwnerDto) => {
  const response = await AxiosInstance.owners.ownersControllerCreate(ownerData);
  return response.data;
};

// Update a owner
export const updateOwner = async (id: string, ownerData: CreateOwnerDto) => {
  const response = await AxiosInstance.owners.ownersControllerUpdate(
    id,
    ownerData
  );
  return response.data;
};

// Delete a owner
export const deleteOwner = async (owner: Owner) => {
  await AxiosInstance.owners.ownersControllerDelete(owner._id);
};

export const renameOwnerDocument = async (
  fileKey: string,
  ownerId: string,
  newFileName: RenameFileDto
) => {
  const response = await AxiosInstance.owners.ownersControllerRenameOwnerFile(
    fileKey,
    ownerId,
    newFileName
  );
  return response.data;
};

export const deleteOwnerDocument = async (fileKey: string, ownerId: string) => {
  const response = await AxiosInstance.owners.ownersControllerDeleteOwnerFile(
    fileKey,
    ownerId
  );
  return response.data;
};
