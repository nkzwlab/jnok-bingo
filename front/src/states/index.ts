import { generateBingoArray } from "@/utils/bingo";
import { useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { ref } from "vue";
import { answerCorrect } from "./quiz";

const serializer = {
  // use base64
  read: (v: any) => (v ? JSON.parse(atob(v)) : null),
  write: (v: any) => btoa(JSON.stringify(v)),
};

// Game status
export const allNumbers = ref<number[]>([]);
export const uuid = useLocalStorage("userId", nanoid());
export const name = useLocalStorage("userName", "", { serializer });

/*  {
    serializer: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
  }, */

// Bingo status
export const grid = useLocalStorage<number[][]>("grid", generateBingoArray(), {
  serializer,
});
export enum Status {
  Bingo,
  Reach,
  None,
}

export const currentStatus = useLocalStorage<Status>("status", Status.None, {
  serializer,
});

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

export function checkIfToReset() {
  // if localstorage key "version" is not set and userId exists in localstorage, reset the game
  if (
    (!localStorage.getItem("version") && localStorage.getItem("userId")) ||
    Number(localStorage.getItem("version")) < 2
  ) {
    localStorage.clear();
    localStorage.setItem("version", "2");
    new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
      location.reload();
    });
  }
}

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
