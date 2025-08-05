import { IRecentMessage } from "../utils";

export const recentMessagesMock: IRecentMessage[] = [
  {
    tenant: {
      _id: "686a6bfe33547b8927dfc66a",
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
      _id: "687f4b067f57e18f83ed58ed",
      firstName: "Bob",
      lastName: "Johnson",
      isOnline: false,
    },
    lastMessage: "Let's catch up later.",
    lastMessageTimestamp: "2023-10-01T11:30:00Z",
    unreadMessagesCount: 0,
  },
];
