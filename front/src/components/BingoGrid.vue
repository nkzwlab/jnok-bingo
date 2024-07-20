<template>
  <div class="bingo-grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell" :class="{
        marked: isMarked(rowIndex, cellIndex),
        stolen: isStolen(rowIndex, cellIndex)
      }" @click="markCell(rowIndex, cellIndex)">
        {{ cellIndex === 2 && rowIndex === 2 ? 'Free' : cell }}
      </div>
    </div>
  </div>
  <div class="status">
    {{ currentStatusString }}
  </div>
</template>

<script setup lang="ts">
import { BingoCellStatus, currentStatus, markedCells, Status } from '@/states';
import { defineProps, watch, computed } from 'vue';

const { grid } = defineProps<{
  grid: number[][];
}>();


const markCell = (rowIndex: number, cellIndex: number) => {
  if (markedCells.value[rowIndex][cellIndex] === BingoCellStatus.Stolen) return;
  if (rowIndex === 2 && cellIndex === 2) return; // Skip the free zone
  if (markedCells.value[rowIndex][cellIndex] === BingoCellStatus.Marked) {
    markedCells.value[rowIndex][cellIndex] = BingoCellStatus.Unmarked;
  } else {
    markedCells.value[rowIndex][cellIndex] = BingoCellStatus.Marked;
  }
};

const isMarked = (rowIndex: number, cellIndex: number) => {
  return markedCells.value[rowIndex][cellIndex] === BingoCellStatus.Marked;
};
const isStolen = (rowIndex: number, cellIndex: number) => {
  return markedCells.value[rowIndex][cellIndex] === BingoCellStatus.Stolen;
};

const currentStatusString = computed(() => {
  switch (currentStatus.value) {
    case Status.Bingo:
      return "ビンゴ🎉"
    case Status.Reach:
      return "リーチ！"
    default:
      return "";
  }
});

const checkBingoAndReach = () => {
  let bingos = 0;
  let reaches = 0;

  // Check rows and columns
  for (let i = 0; i < 5; i++) {
    const rowMarkedCount = markedCells.value[i].filter(cell => cell === BingoCellStatus.Marked).length;
    const colMarkedCount = markedCells.value.map(row => row[i]).filter(cell => cell === BingoCellStatus.Marked).length;

    // steal count
    const rowStolenCount = markedCells.value[i].filter(cell => cell === BingoCellStatus.Stolen).length;
    const colStolenCount = markedCells.value.map(row => row[i]).filter(cell => cell === BingoCellStatus.Stolen).length;


    if (rowMarkedCount === 5) bingos++;
    if (colMarkedCount === 5) bingos++;

    if (rowMarkedCount === 4 && rowStolenCount === 0) reaches++;
    if (colMarkedCount === 4 && colStolenCount === 0) reaches++;
  }

  // Check diagonals
  const mainDiagonalCount = markedCells.value.map((row, index) => row[index]).filter(cell => cell === BingoCellStatus.Marked).length;
  const antiDiagonalCount = markedCells.value.map((row, index) => row[4 - index]).filter(cell => cell === BingoCellStatus.Marked).length;
  const mainDiagonalStolenCount = markedCells.value.map((row, index) => row[index]).filter(cell => cell === BingoCellStatus.Stolen).length;
  const antiDiagonalStolenCount = markedCells.value.map((row, index) => row[4 - index]).filter(cell => cell === BingoCellStatus.Stolen).length;

  if (mainDiagonalCount === 5) bingos++;
  if (antiDiagonalCount === 5) bingos++;

  if (mainDiagonalCount === 4 && mainDiagonalStolenCount === 0) reaches++;
  if (antiDiagonalCount === 4 && antiDiagonalStolenCount === 0) reaches++;

  if (bingos > 0) {
    currentStatus.value = Status.Bingo;
  } else if (reaches > 0) {
    currentStatus.value = Status.Reach;
  } else {
    currentStatus.value = Status.None;
  }
};

// Watch for changes in the markedCells to update bingo and reach counts
watch(markedCells, checkBingoAndReach, { deep: true });

</script>

<style scoped>
.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  max-width: 100vh;
  margin: auto;
}

.row {
  display: contents;
}

.cell {
  width: calc(100vh / 5 - 30px);
  /* Set a fixed width */
  height: calc(100vh / 5 - 30px);
  /* Set a fixed height */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  background-color: #333;
  color: #fff;
  font-size: 150%;
  cursor: pointer;
}

.cell.marked {
  background-color: #4caf50;
}

.cell.stolen {
  background-color: #f44336;
}

.status {
  margin-top: 12px;
  color: #fff;
  font-size: 20px;
  text-align: center;
}

@media (max-width: 900px) {
  .bingo-grid {
    max-width: 100%;
    max-height: calc(100vh - 150px);
    gap: 3px;
  }

  .cell {
    height: calc(((100vh - 150px) / 5) - 20px);
    width: calc(((100vh - 150px) / 5) - 20px);
  }
}

@media (max-width: 600px) {
  .bingo-grid {
    max-width: 100%;
    gap: 3px;
  }

  .cell {
    width: 17vw;
    height: 17vw;
  }
}
</style>
