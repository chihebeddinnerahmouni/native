import { useQuery } from "@tanstack/react-query";
import { ChatListItemDto } from "../../../backend/casaikos-api";
import { getChatListHandler } from "../../api/messages.api";

type IResponse = {
  chatList: ChatListItemDto[];
  isLoading: boolean;
};

export const useChatList = (): IResponse => {
  const { data: chatList, isLoading } = useQuery({
    queryKey: ["chat-list"],
    queryFn: () => getChatListHandler(),
    select: (data) =>
      [...data].sort(
        (a, b) =>
          new Date(b.lastMessageTimestamp).getTime() -
          new Date(a.lastMessageTimestamp).getTime()
      ),
  });

  return {
    chatList: chatList || [],
    isLoading: isLoading || false,
  };
};
