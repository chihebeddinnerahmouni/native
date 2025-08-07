import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../api/properties.api";
import {
  ESocketRefreshModule,
  Property,
  FetchPropertiesDto,
} from "../../../backend/casaikos-api";
import { emptyPagination, IPaginationResult } from "../../../types";

type IResponse = {
  propertiesResult: IPaginationResult<Property>;
  isLoading: boolean;
};

export const useProperties = (options: FetchPropertiesDto): IResponse => {
  const { data: propertiesResult, isLoading } = useQuery({
    queryKey: [
      ESocketRefreshModule.PROPERTIES,
      options?.filter?.cities,
      options?.filter?.title,
      options?.pagination?.page,
      options?.pagination?.pageSize,
      options?.sort?.sortBy,
      options?.sort?.sortDirection,
      options?.select,
    ],
    queryFn: () => getProperties(options),
  });

  return {
    propertiesResult: propertiesResult ?? emptyPagination,
    isLoading,
  };
};
