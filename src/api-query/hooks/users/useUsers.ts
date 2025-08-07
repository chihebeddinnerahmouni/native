import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/users.api";
import {
  ESocketRefreshModule,
  FetchUsersDto,
  User,
} from "../../../backend/casaikos-api";
import {
  emptyPagination,
  IPaginationResult,
} from "../../../types/paginationResult.type";

type UseUserProps = {
  usersResult: IPaginationResult<User>;
  isLoading: boolean;
  error: unknown;
};

export const useUsers = (options: FetchUsersDto): UseUserProps => {
  const {
    data: usersResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      ESocketRefreshModule.USERS,
      options?.filter?.name,
      options?.pagination?.page,
      options?.pagination?.pageSize,
      options?.sort?.sortBy,
      options?.sort?.sortDirection,
      options?.select,
    ],
    queryFn: () => fetchUsers(options),
  });

  return {
    usersResult: usersResult ?? emptyPagination,
    isLoading,
    error,
  };
};
