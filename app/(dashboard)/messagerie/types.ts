export type Conversation = {
  id: string;
  name: string;
  preview: string;
  time: string;
  type: "person" | "group" | "support" | "system";
  unreadCount?: number;
  urgent?: boolean;
};