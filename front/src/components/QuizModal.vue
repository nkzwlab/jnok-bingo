<template>
  <div v-if="answerCorrect != null" class="result">
    <span id="sym" v-if="answerCorrect === true">⭕️</span>
    <span id="sym" v-else>❌</span>
  </div>
  <div class="options">
    <button v-for="option in options" :key="option" @click="selectOption(option)" :class="{
      selected: selectedOption === option,
      disabled: alreadyAnswered,
      a: option === 'A',
      b: option === 'B',
      c: option === 'C',
      d: option === 'D',
    }">
      <img :src="`/imgs/${inQuiz}${option.toLowerCase()}.${ext}`" />
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { quizAnswer } from '@/gateway';
import { alreadyAnswered, answerCorrect, inQuiz, options, selectedOption } from '@/states/quiz';
import { computed } from 'vue';

const selectOption = (option: string) => {
  if (alreadyAnswered.value) {
    return;
  }
  quizAnswer(option.toLowerCase());
  alreadyAnswered.value = true;
  selectedOption.value = option.toLowerCase();
};

const ext = computed(() => {
  if (inQuiz.value === 'q1' || inQuiz.value === 'q3') {
    return 'png';
  }
  return 'jpg';
});
</script>

<style scoped>
.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.options button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  font-weight: bold;
  border: 1px solid #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  overflow: hidden;
  position: relative;
  padding: 0;
}

.options img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}


.options button span {
  position: relative;
  z-index: 2;
}

button.a {
  background-color: #ff9999;
}

button.b {
  background-color: #99ccff;
}

button.c {
  background-color: #99ff99;
}

button.d {
  background-color: #ffcc99;
}

button:hover {
  filter: brightness(1.1);
}

button.disabled {
  cursor: not-allowed;
  background-color: #ccc !important;
}

.result {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  font-weight: bold;
  z-index: 2;
}
</style>
