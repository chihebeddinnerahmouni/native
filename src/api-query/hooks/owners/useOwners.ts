import { useQuery } from "@tanstack/react-query";
import { fetchOwners } from "../../api/owners.api";
import {
  ESocketRefreshModule,
  FetchOwnersDto,
  Owner,
} from "../../../backend/casaikos-api";
import {
  emptyPagination,
  IPaginationResult,
} from "../../../types/paginationResult.type";

type IResponse = {
  ownersResult: IPaginationResult<Owner>;
  isLoading: boolean;
  error: unknown;
};

export const useOwners = (options: FetchOwnersDto): IResponse => {
  const {
    data: ownersResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      ESocketRefreshModule.OWNERS,
      options?.filter?.cities,
      options?.filter?.name,
      options?.pagination?.page,
      options?.pagination?.pageSize,
      options?.sort?.sortBy,
      options?.sort?.sortDirection,
      options?.select,
    ],
    queryFn: () => fetchOwners(options),
  });

  return {
    ownersResult: ownersResult ?? emptyPagination,
    isLoading,
    error,
  };
};
