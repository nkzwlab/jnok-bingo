<script setup lang="ts">
import BingoUI from '../components/BingoGrid.vue'
import { currentNumber, grid, name } from '@/states';
</script>
<template>
  <div class="wrapper">
    <div class="bingo-grid">
      <BingoUI :grid="grid" />
    </div>
    <div class="bingo-info">
      <input v-model="name" placeholder="Enter your name" />
      <div class="current-number">
        次: {{ currentNumber ?? '??' }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background-color: #000;
}

.current-number {
  font-size: 40px;
  color: #fff;
}

.current-number {
  font-size: 40px;
  color: #fff;
}
</style>
