import { useQuery } from "@tanstack/react-query";
import { ESocketRefreshModule, Property } from "../../../backend/casaikos-api";
import { getOwnerProperties } from "../../api/properties.api";

type IProps = {
  ownerId: string;
};

type IResponse = {
  propertiesList: Property[];
  error: unknown;
  isLoading: boolean;
};

export const useOwnerProperties = (options: IProps): IResponse => {
  const { ownerId } = options;

  const {
    data: propertiesList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ESocketRefreshModule.OWNERS + "_" + ownerId],
    queryFn: () => getOwnerProperties(ownerId),
    enabled: !!ownerId,
  });

  return {
    propertiesList: propertiesList ?? [],
    error,
    isLoading,
  };
};
