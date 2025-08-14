import { useQuery } from "@tanstack/react-query";
import { getOwnerById } from "../../api/owners.api";
import { ESocketRefreshModule, Owner } from "../../../backend/casaikos-api";

type IResponse = {
  owner: Owner | undefined;
  error: unknown;
  isLoading: boolean;
};

type IProps = {
  ownerId: string;
};

export const useSingleOwner = (options: IProps): IResponse => {
  const { ownerId } = options;

  const {
    data: owner,
    error,
    isLoading,
  } = useQuery({
    queryKey: [ESocketRefreshModule.OWNERS, ownerId],
    queryFn: () => getOwnerById(ownerId),
    enabled: !!ownerId,
  });

  return {
    owner: owner,
    error,
    isLoading,
  };
};
