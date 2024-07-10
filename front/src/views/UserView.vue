<script setup lang="ts">
import { computed, ref } from 'vue';
import BingoUI from '../components/BingoGrid.vue';
import { allNumbers, grid, name } from '@/states';

const isModalOpen = ref(true);

const toggleModal = () => {
  if (name.value) {
    isModalOpen.value = !isModalOpen.value;
  }
};

const numberHistory = computed(() => allNumbers.value.slice(0, -1).reverse().join(', '));
const currentNumber = computed(() => allNumbers.value[allNumbers.value.length - 1]);
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
      <div class="result-item">
        <span class="result-label">過去の数字:</span>
        <span class="result-content">{{ numberHistory }}</span>
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

.result-item {
  display: flex;
  flex-direction: column;
  margin: 24px 0;
  /* Reduced margin */
  align-items: center;
}

.result-label {
  font-weight: bold;
  color: #ffffff;
  font-size: 16px;
  /* Reduced font size */
}

.result-content {
  font-size: 24px;
  /* Reduced font size */
  color: #ffffff;
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
