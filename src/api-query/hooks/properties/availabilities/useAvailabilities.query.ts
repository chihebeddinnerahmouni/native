import { useQuery } from "@tanstack/react-query";
import {
  Availability,
  ESocketRefreshModule,
} from "../../../../backend/casaikos-api";
import { fetchAvailabilities } from "../../../api/availabilities.api";

type IProps = {
  propertyId: string;
};

type IResponse = {
  availabilities: Availability[];
};

export const useAvailabilities = (options: IProps): IResponse => {
  const { propertyId } = options;

  const { data: availabilities } = useQuery({
    queryKey: [ESocketRefreshModule.AVAILABILITIES, propertyId],
    queryFn: () => fetchAvailabilities(propertyId),
    enabled: !!propertyId,
  });

  return {
    availabilities: availabilities || [],
  };
};
