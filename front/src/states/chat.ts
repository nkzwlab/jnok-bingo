import { reactive } from "vue";

export type ChatMessage = {
  message: string;
  name: string;
  id: string;
};

export const messages: ChatMessage[] = reactive([]);
