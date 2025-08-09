import { useQuery } from "@tanstack/react-query";
import { fetchPropertyById } from "../../api/properties.api";
import { ESocketRefreshModule, Property } from "../../../backend/casaikos-api";

type IProps = {
  propertyId: string;
};

type UsePropertiesResponse = {
  property: Property | undefined;
  isLoading: boolean;
  propertyError: unknown;
};

export const useSingleProperty = (options: IProps): UsePropertiesResponse => {
  const { propertyId } = options;

  const {
    data: property,
    isLoading,
    error: propertyError,
  } = useQuery({
    queryKey: [ESocketRefreshModule.PROPERTIES, propertyId],
    queryFn: () => fetchPropertyById(propertyId),
    enabled: !!propertyId,
  });

  return {
    property: property,
    isLoading,
    propertyError,
  };
};
