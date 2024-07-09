<template>
  <div class="bingo-container">
    <div class="left-panel">
      <button class="new-number-btn" @click="newNumber" :disabled="allNumbers.length === 75">次の数</button>
      <button class="new-number-btn" @click="resetAll">リセット</button>
      <div class="result-item bingo-item">
        <span class="result-label">ビンゴ:</span>
        <span class="result-content bingo-content">{{ bingoPeople.bingo.join(', ') }}</span>
      </div>
      <div class="result-item reach-item">
        <span class="result-label">リーチ:</span>
        <span class="result-content reach-content">{{ bingoPeople.reach.join(', ') }}</span>
      </div>
    </div>
    <div class="right-panel">
      <div class="result-item current-number">
        <span class="result-label">今回の数:</span>
        <span class="result-content large">{{ currentNumber }}</span>
      </div>
      <div class="result-item past-numbers">
        <span class="result-label">過去の数:</span>
        <span class="result-content">{{ numberHistory }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { newNumber, resetAll } from '@/gateway/admin';
import { allNumbers, bingoPeople } from '@/states/admin';
import { computed } from 'vue';
import '../gateway/admin';

const numberHistory = computed(() => allNumbers.value.slice(0, -1).reverse().join(', '));
const currentNumber = computed(() => allNumbers.value[allNumbers.value.length - 1]);
</script>

<style>
body {
  background-color: #121212;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.bingo-container {
  display: flex;
  justify-content: space-between;
  background-color: #1e1e1e;
  padding: 40px;
  /* Increased padding for larger layout */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  max-width: 1200px;
  margin: auto;
  color: #ffffff;
}

.left-panel,
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-panel {
  justify-content: flex-start;
}

.right-panel {
  justify-content: center;
}

.new-number-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  /* Reduced padding */
  border: none;
  border-radius: 5px;
  font-size: 16px;
  /* Reduced font size */
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px 0;
  /* Reduced margin */
}

.new-number-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.new-number-btn:not(:disabled):hover {
  background-color: #0056b3;
}

.result-item {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
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

.bingo-item .result-label,
.bingo-item .result-content {
  font-size: 64px;
  /* Halved font size */
}

.reach-item .result-label,
.reach-item .result-content {
  font-size: 32px;
  /* Halved font size for reach */
}

.current-number .result-content.large {
  font-size: 48px;
  /* Reduced size for large text */
  color: #ff5722;
}

@media (min-width: 1024px) {
  .bingo-container {
    min-height: 100vh;
  }
}
</style>
