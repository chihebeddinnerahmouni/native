import { useQuery } from "@tanstack/react-query";
import { getTenantById } from "../../api/tenants.api";
import { ESocketRefreshModule, Tenant } from "../../../backend/casaikos-api";

type IProps = {
  tenantId: string;
};

type IResponse = {
  tenant: Tenant | undefined;
  tenantError: unknown;
};

export const useSingleTenant = (options: IProps): IResponse => {
  const { tenantId } = options;

  const { data: tenant, error: tenantError } = useQuery({
    queryKey: [ESocketRefreshModule.TENANTS, tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId,
  });

  return {
    tenant,
    tenantError,
  };
};
