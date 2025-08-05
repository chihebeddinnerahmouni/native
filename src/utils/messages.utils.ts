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
  "#c795a0",
  "#f0a500",
  "#ff6f61",
  "#6b5b95",
  "#88b04b",
  "#f7cac9",
  "#ffb3ba",
  "#ff677d",
  "#d4a5a5",
  "#392f5a",
];

export const getIconColorFromId = (id: string | undefined) => {
  if (!id) return colorPalette[0];
  const index =
    id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    colorPalette.length;
  return colorPalette[index];
};
