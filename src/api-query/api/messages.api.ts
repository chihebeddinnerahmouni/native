import { UpdateConversationLeadDto } from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

export const updateLeadConversationHandler = async (
  params: UpdateConversationLeadDto
) => {
  const result =
    await AxiosInstance.whatsapp.whatsappControllerUpdateConversationLead(
      params
    );
  return result.data;
};

export const getChatListHandler = async () => {
  const result = await AxiosInstance.whatsapp.whatsappControllerFetchChatList();
  return result.data;
};

export const getTenantChatsHandler = async (tenantId: string) => {
  const result =
    await AxiosInstance.whatsapp.whatsappControllerFetchTenantChats(tenantId);
  return result.data;
};

export const markAsReadHandler = async (tenantId: string) => {
  AxiosInstance.whatsapp.whatsappControllerMarkChatAsRead({
    tenantId,
  });
};

export const markChatAsReadHandler = async (tenantId: string) => {
  AxiosInstance.whatsapp.whatsappControllerMarkChatAsRead({
    tenantId,
  });
};
