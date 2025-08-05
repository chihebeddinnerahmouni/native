import { IRecentMessage } from "../utils";

export const recentMessagesMock: IRecentMessage[] = [
  {
    tenant: {
      _id: "1",
      firstName: "Alice",
      lastName: "Smith",
      isOnline: true,
    },
    lastMessage: "Hey, how are you?",
    lastMessageTimestamp: "2023-10-01T12:00:00Z",
    unreadMessagesCount: 2,
  },
  {
    tenant: {
      _id: "2",
      firstName: "Bob",
      lastName: "Johnson",
      isOnline: false,
    },
    lastMessage: "Let's catch up later.",
    lastMessageTimestamp: "2023-10-01T11:30:00Z",
    unreadMessagesCount: 0,
  },
];
