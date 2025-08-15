import { useQuery } from "@tanstack/react-query";
import {
  Booking,
  ESocketRefreshModule,
  FetchBookingsDto,
} from "../../../backend/casaikos-api";
import { getBookings } from "../../api/bookings.api";
import {
  emptyPagination,
  IPaginationResult,
} from "../../../types/paginationResult.type";

type IResult = {
  bookingsResult: IPaginationResult<Booking>;
  isLoading: boolean;
};

export const useBookings = (options: FetchBookingsDto): IResult => {
  const { data: bookingsResult, isLoading } = useQuery({
    queryKey: [
      ESocketRefreshModule.BOOKINGS,
      options?.filter?.cities,
      options?.filter?.tenantIds,
      options?.filter?.propertyIds,
      options?.filter?.agentsIds,
      options?.filter?.date,
      options?.pagination?.page,
      options?.pagination?.pageSize,
      options?.sort?.sortBy,
      options?.sort?.sortDirection,
      options?.select,
    ],
    queryFn: () => getBookings(options),
  });

  return {
    bookingsResult: bookingsResult ?? emptyPagination,
    isLoading: isLoading,
  };
};
