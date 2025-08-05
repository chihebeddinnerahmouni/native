import { useQuery } from "@tanstack/react-query";
import { WhatsappChat } from "../../../backend/casaikos-api";
import { getTenantChatsHandler } from "../../api/messages.api";

type IProps = {
  tenantId: string;
};

type IResponse = {
  messagesResult: WhatsappChat[];
  isSuccess: boolean;
  refetch: () => void;
  isLoading: boolean;
};

export const useMessages = (options: IProps): IResponse => {
  const { tenantId } = options;

  const {
    data: messages,
    isSuccess,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["messages", tenantId],
    queryFn: () => getTenantChatsHandler(tenantId),
    enabled: !!tenantId,
  });

  return {
    messagesResult: messages || [],
    isSuccess: isSuccess || false,
    refetch,
    isLoading,
  };
};
