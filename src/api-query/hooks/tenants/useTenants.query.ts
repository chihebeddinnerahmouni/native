import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../api/tenants.api";
import {
  ESocketRefreshModule,
  FetchTenantsDto,
  Tenant,
} from "../../../backend/casaikos-api";

import {
  emptyPagination,
  IPaginationResult,
} from "../../../types/paginationResult.type";

type IResult = {
  tenantsResult: IPaginationResult<Tenant>;
  isLoading: boolean;
  error: unknown;
};

export const useTenants = (options: FetchTenantsDto): IResult => {
  const {
    data: tenantsResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      ESocketRefreshModule.TENANTS,
      options?.filter?.cities,
      options?.filter?.name,
      options?.pagination?.page,
      options?.pagination?.pageSize,
      options?.sort?.sortBy,
      options?.sort?.sortDirection,
      options?.select,
    ],
    queryFn: () => getTenants(options),
  });

  return {
    tenantsResult: tenantsResult ?? emptyPagination,
    isLoading,
    error,
  };
};
