<template>
  <div v-if="answerCorrect != null" class="result">
    <span id="sym" v-if="answerCorrect === true">⭕️</span>
    <span id="sym" v-else>❌</span>
  </div>
  <div class="options">
    <button v-for="option in options" :key="option" @click="selectOption(option)" :class="{
      selected: selectedOption === option,
      disabled: alreadyAnswered && !(correctAnswer === option.toLowerCase()),
      a: option === 'A',
      b: option === 'B',
      c: option === 'C',
      d: option === 'D',
    }">
      <div class="answer-border" :class="{ correct: correctAnswer === option.toLowerCase(), }"></div>
      <img :src="`/imgs/${inQuiz}${option.toLowerCase()}.${ext}`" />
      <span>{{ option }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { quizAnswer } from '@/gateway';
import { alreadyAnswered, answerCorrect, correctAnswer, inQuiz, options, selectedOption } from '@/states/quiz';
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
  margin: 0;
  box-sizing: border-box;
}

.options button {
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  font-weight: bold;
  border: 1px solid #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  overflow: hidden;
  position: relative;
  padding: 0px;
  box-sizing: border-box;
}

.options img {
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  object-fit: contain;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 0;
}

.answer-border {
  width: 100%;
  height: 100%;
  position: absolute;
}

.answer-border.correct {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 5px solid #00ff00;
}

.options button span {
  position: relative;
  z-index: 2;
  /* 半透明の白 */
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0 10px;
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
  z-index: 3;
}
</style>
