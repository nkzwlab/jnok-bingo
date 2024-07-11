import { generateBingoArray } from "@/utils/bingo";
import { useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { ref } from "vue";

// Game status
export const currentNumber = ref<number | null>(null);
export const uuid = useLocalStorage("userId", nanoid());
export const name = useLocalStorage("userName", "");

// Bingo status
export const grid = useLocalStorage("grid", generateBingoArray());
export enum Status {
  Bingo,
  Reach,
  None,
}

export const currentStatus = useLocalStorage<Status>("status", Status.None);

export const markedCells = useLocalStorage<boolean[][]>(
  "markedCells",
  grid.value.map((row, rowIndex) =>
    row.map((_, cellIndex) => rowIndex === 2 && cellIndex === 2),
  ),
);
