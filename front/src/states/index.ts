import { generateBingoArray } from "@/utils/bingo";
import { useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { ref } from "vue";
import { answerCorrect } from "./quiz";

// Game status
export const allNumbers = ref<number[]>([]);
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

export enum BingoCellStatus {
  Marked,
  Unmarked,
  Stolen,
}

export const markedCells = useLocalStorage<BingoCellStatus[][]>(
  "markedCells",
  grid.value.map((row, rowIndex) =>
    row.map((_, cellIndex) => {
      if (rowIndex === 2 && cellIndex === 2) {
        return BingoCellStatus.Marked;
      } else {
        return BingoCellStatus.Unmarked;
      }
    }),
  ),
);

export function stealCell(cellStatus: BingoCellStatus) {
  if (answerCorrect.value === false) {
    // 現在マークされたCellのうち、ランダムに1つを選び、ステータスをStolenに変更する
    const markedCellIndexes = markedCells.value
      .flatMap((row, rowIndex) =>
        row.map((cell, cellIndex) =>
          cell === BingoCellStatus.Marked ? [rowIndex, cellIndex] : null,
        ),
      )
      .filter((cell) => cell !== null) as [number, number][];
    if (markedCellIndexes.length > 0) {
      const randomIndex = Math.floor(Math.random() * markedCellIndexes.length);
      const [rowIndex, cellIndex] = markedCellIndexes[randomIndex];
      markedCells.value[rowIndex][cellIndex] = cellStatus;
    }
  }
}
