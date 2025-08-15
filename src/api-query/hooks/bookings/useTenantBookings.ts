import { useQuery } from "@tanstack/react-query";
import { Booking, ESocketRefreshModule } from "../../../backend/casaikos-api";
import { getTenantBookings } from "../../api/bookings.api";

type IProps = {
  tenantId: string;
};

type IResponse = {
  bookingsList: Booking[];
  isLoading: boolean;
};

export const useTenantBookings = (options: IProps): IResponse => {
  const { tenantId } = options;

  const { data: bookingsList, isLoading } = useQuery({
    queryKey: [ESocketRefreshModule.BOOKINGS, tenantId],
    queryFn: () => getTenantBookings(tenantId),
    enabled: !!tenantId,
  });

  return {
    bookingsList: bookingsList ?? [],
    isLoading,
  };
};
