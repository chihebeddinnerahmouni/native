import { useQuery } from "@tanstack/react-query";
import { ESocketRefreshModule, Target } from "../../../../backend/casaikos-api";
import { fetchTargets } from "../../../api/targets.api";

type IResponse = {
  targets: Target[];
};

type IProps = {
  propertyId: string;
};

export const useTargets = (options: IProps): IResponse => {
  const { propertyId } = options;

  const { data: targets } = useQuery({
    queryKey: [ESocketRefreshModule.TARGETS, propertyId],
    queryFn: () => fetchTargets(propertyId),
    enabled: !!propertyId,
  });

  return {
    targets: targets || [],
  };
};
