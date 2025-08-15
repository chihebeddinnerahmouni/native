import { useQuery } from "@tanstack/react-query";
import { ESocketRefreshModule, Payment } from "../../../backend/casaikos-api";
import { getTenantPaymentsHandler } from "../../api/tenants.api";

type IProps = {
  tenantId: string;
};

type IResponse = {
  paymentsList: Payment[];
  isLoading: boolean;
};

export const useTenantPayments = (options: IProps): IResponse => {
  const { tenantId } = options;

  const { data: paymentsList, isLoading } = useQuery({
    queryKey: [ESocketRefreshModule.PAYMENTS, tenantId],
    queryFn: () => getTenantPaymentsHandler(tenantId),
    enabled: !!tenantId,
  });

  return {
    paymentsList: paymentsList ?? [],
    isLoading,
  };
};
