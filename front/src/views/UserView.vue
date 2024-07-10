<script setup lang="ts">
import { ref } from 'vue';
import BingoUI from '../components/BingoGrid.vue';
import { currentNumber, grid, name } from '@/states';

const isModalOpen = ref(true);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
</script>

<template>
  <div class="wrapper">
    <div class="bingo-grid">
      <BingoUI :grid="grid" />
    </div>
    <div class="bingo-info">
      <div class="current-number">
        現在の数字: {{ currentNumber ?? '??' }}
      </div>
    </div>

    <button class="name-input-btn" @click="toggleModal">名前を入力</button>
    <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal">
      <div class="modal-content" @click.stop>
        <input v-model="name" placeholder="Enter your name" />
        <button @click="toggleModal">Close</button>
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

.bingo-info button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
}

.modal-content button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.name-input-btn {
  /* 右下 */
  position: fixed;
  bottom: 20px;
  right: 20px;
}

@media screen and (max-width: 900px) {
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
