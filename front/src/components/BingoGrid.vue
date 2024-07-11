<template>
  <div class="bingo-grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell"
        :class="{ marked: isMarked(rowIndex, cellIndex) }" @click="markCell(rowIndex, cellIndex)">
        {{ cellIndex === 2 && rowIndex === 2 ? 'Free' : cell }}
      </div>
    </div>
    <div class="status">
      {{ currentStatusString }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { currentStatus, markedCells, Status } from '@/states';
import { defineProps, watch, computed } from 'vue';

const { grid } = defineProps<{
  grid: number[][];
}>();


const markCell = (rowIndex: number, cellIndex: number) => {
  if (rowIndex === 2 && cellIndex === 2) return; // Skip the free zone
  markedCells.value[rowIndex][cellIndex] = !markedCells.value[rowIndex][cellIndex];
  checkBingoAndReach();
};

const isMarked = (rowIndex: number, cellIndex: number) => {
  return markedCells.value[rowIndex][cellIndex];
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
    const rowMarkedCount = markedCells.value[i].filter(cell => cell).length;
    const colMarkedCount = markedCells.value.map(row => row[i]).filter(cell => cell).length;

    if (rowMarkedCount === 5) bingos++;
    if (colMarkedCount === 5) bingos++;

    if (rowMarkedCount === 4) reaches++;
    if (colMarkedCount === 4) reaches++;
  }

  // Check diagonals
  const mainDiagonalCount = markedCells.value.map((row, index) => row[index]).filter(cell => cell).length;
  const antiDiagonalCount = markedCells.value.map((row, index) => row[4 - index]).filter(cell => cell).length;

  if (mainDiagonalCount === 5) bingos++;
  if (antiDiagonalCount === 5) bingos++;

  if (mainDiagonalCount === 4) reaches++;
  if (antiDiagonalCount === 4) reaches++;

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
  max-width: 500px;
  margin: auto;
}

.row {
  display: contents;
}

.cell {
  width: 100px;
  /* Set a fixed width */
  height: 100px;
  /* Set a fixed height */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  background-color: #333;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.cell.marked {
  background-color: #4caf50;
}

.status {
  margin-top: 20px;
  color: #fff;
  font-size: 20px;
}
</style>
