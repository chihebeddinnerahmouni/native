import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { EChatMessageType, WhatsappChat } from "../../../backend/casaikos-api";
import { TLeadConversation } from "../../../screens/messages/messages/messages.page";
import {
  markAsReadHandler,
  markChatAsReadHandler,
  updateLeadConversationHandler,
} from "../../api/messages.api";
import { showErrorAlert } from "../../../components/ui/alerts/alerts.component";

type SaveVariables = {
  leadConversation: TLeadConversation;
  selectedTenantId: string;
  userId: string;
};

type IResponse = {
  updateLeadConversation: UseMutateAsyncFunction<
    WhatsappChat,
    Error,
    SaveVariables,
    unknown
  >;
  isUpdatingLead: boolean;
  markAsRead: UseMutateAsyncFunction<
    void,
    Error,
    { tenantId: string },
    unknown
  >;
  markChatAsRead: UseMutateAsyncFunction<
    void,
    Error,
    { tenantId: string },
    unknown
  >;
};

export const useMessagesMutation = (): IResponse => {
  const updateLeadMutation = useMutation({
    mutationFn: ({
      leadConversation,
      selectedTenantId,
      userId,
    }: SaveVariables) => {
      return leadConversation.isMe
        ? updateLeadConversationHandler({
            lead: EChatMessageType.AiTookLead,
            tenantId: selectedTenantId,
          })
        : updateLeadConversationHandler({
            lead: EChatMessageType.AgentTookLead,
            agentId: userId,
            tenantId: selectedTenantId,
          });
    },
    onError: (error) => {
      showErrorAlert(
        "Error",
        error.message || "Failed to update conversation lead"
      );
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: ({ tenantId }: { tenantId: string }) => {
      return Promise.resolve(markAsReadHandler(tenantId));
    },
  });

  const markChatAsReadMutation = useMutation({
    mutationFn: ({ tenantId }: { tenantId: string }) => {
      return Promise.resolve(markChatAsReadHandler(tenantId));
    },
  });

  return {
    updateLeadConversation: updateLeadMutation.mutateAsync,
    isUpdatingLead: updateLeadMutation.isPending,
    markAsRead: markAsReadMutation.mutateAsync,
    markChatAsRead: markChatAsReadMutation.mutateAsync,
  };
};
