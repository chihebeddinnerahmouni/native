export interface IRecentMessage {
  tenant: {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    isOnline: boolean;
  };
  lastMessage: string | null;
  lastMessageTimestamp: string | null;
  unreadMessagesCount: number;
}

const colorPalette = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

export const getIconColorFromId = (id: string | undefined) => {
  if (!id) return colorPalette[0];
  const index =
    id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    colorPalette.length;
  return colorPalette[index];
};
