import {
  CreateTenantDto,
  FetchTenantsDto,
  RenameFileDto,
  Tenant,
} from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

// Fetch all tenants
export const getTenants = async (options: FetchTenantsDto) => {
  const response =
    await AxiosInstance.tenants.tenantsControllerFindAll(options);
  return response.data;
};

export const getTenantById = async (id: string) => {
  const response = await AxiosInstance.tenants.tenantsControllerFindById(id);
  return response.data;
};

export const createTenant = async (tenantData: CreateTenantDto) => {
  const response =
    await AxiosInstance.tenants.tenantsControllerCreate(tenantData);
  return response.data;
};

// Update a tenant
export const updateTenant = async (id: string, tenantData: CreateTenantDto) => {
  const response = await AxiosInstance.tenants.tenantsControllerUpdate(
    id,
    tenantData
  );
  return response.data;
};

// Delete a tenant
export const deleteTenant = async (tenant: Tenant) => {
  await AxiosInstance.tenants.tenantsControllerDelete(tenant._id);
};

export const renameTenantDocument = async (
  fileKey: string,
  tenantId: string,
  newFileName: RenameFileDto
) => {
  const response =
    await AxiosInstance.tenants.tenantsControllerRenameTenantFile(
      fileKey,
      tenantId,
      newFileName
    );
  return response.data;
};

export const deleteTenantDocument = async (
  fileKey: string,
  tenantId: string
) => {
  const response =
    await AxiosInstance.tenants.tenantsControllerDeleteTenantFile(
      fileKey,
      tenantId
    );
  return response.data;
};

export const getTenantPaymentsHandler = async (tenantId: string) => {
  const { data } =
    await AxiosInstance.tenants.tenantsControllerGetTenantPayments(tenantId);
  return data;
};
