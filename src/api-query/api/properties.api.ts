import {
  CreatePropertyDto,
  FetchPropertiesDto,
  HostedFile,
  RenameFileDto,
} from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

// Fetch all properties
export const getProperties = async (options: FetchPropertiesDto) => {
  const response =
    await AxiosInstance.properties.propertiesControllerFindAll(options);
  return response.data;
};

export const fetchPropertyById = async (id: string) => {
  const response =
    await AxiosInstance.properties.propertiesControllerGetProperty(id);
  return response.data;
};

export const createProperty = async (createProperty: CreatePropertyDto) => {
  const response =
    await AxiosInstance.properties.propertiesControllerCreateProperty(
      createProperty
    );
  return response.data;
};

export const updateProperty = async (
  id: string,
  updateProperty: CreatePropertyDto
) => {
  const response = await AxiosInstance.properties.propertiesControllerUpdate(
    id,
    updateProperty
  );
  return response.data;
};

export const deleteProperty = async (propertyId: string) => {
  await AxiosInstance.properties.propertiesControllerDeleteProperty(propertyId);
};

export const getOwnerProperties = async (ownerId: string) => {
  const response = await AxiosInstance.properties.propertiesControllerFindAll({
    filter: {
      ownerIds: [ownerId],
    },
  });

  return response.data.items;
};

export const renamePropertyDocument = async (
  fileKey: string,
  propertyId: string,
  newFileName: RenameFileDto
) => {
  const response =
    await AxiosInstance.properties.propertiesControllerRenamePropertyFile(
      fileKey,
      propertyId,
      newFileName
    );
  return response.data;
};

export const deletePropertyDocument = async (
  fileKey: string,
  propertyId: string
) => {
  const response =
    await AxiosInstance.properties.propertiesControllerDeletePropertyFile(
      fileKey,
      propertyId
    );
  return response.data;
};

export const deletePropertyImageHandler = async (
  propertyId: string,
  fileKey: string
) =>
  await AxiosInstance.properties.propertiesControllerDeletePropertyImage(
    propertyId,
    {
      imageFileKey: fileKey,
    }
  );

export const updateMainImageHandler = async (
  propertyId: string,
  images: HostedFile[]
) => {
  await AxiosInstance.properties.propertiesControllerUpdateImagesOrder(
    propertyId,
    {
      images,
    }
  );
};

export const editAmenitiesHandler = async (
  propertyId: string,
  amenities: string[]
) => {
  await AxiosInstance.properties.propertiesControllerUpdate(propertyId, {
    amenities,
  });
};

export const deletePropertyNoteHandler = async (
  propertyId: string,
  noteId: string
) => {
  await AxiosInstance.properties.propertiesControllerDeleteNoteProperty(
    propertyId,
    noteId
  );
};

export const deleteFacilityHandler = async (
  propertyId: string,
  facilityId: string
) => {
  await AxiosInstance.properties.propertiesControllerDeleteFacility(
    propertyId,
    facilityId
  );
};

export const scrapingSyncHandler = async (companyId: string) => {
  const response =
    await AxiosInstance.scrapingSync.scrapingSyncControllerImportCompanyProperties(
      companyId
    );
  return response.data;
};
