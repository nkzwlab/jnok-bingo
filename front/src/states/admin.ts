import { ref } from "vue";

export const bingoPeople = ref<{
  bingo: string[];
  reach: string[];
}>({
  bingo: [],
  reach: [],
});

export const allNumbers = ref<number[]>([]);
