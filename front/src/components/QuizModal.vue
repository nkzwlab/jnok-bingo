<template>
  <!-- <button v-if="answerCorrect != null" @click="inQuiz = false">閉じる</button> -->
  <div class="options">
    <div v-if="answerCorrect != null" class="result">
      <span v-if="answerCorrect === true">⭕️</span>
      <span v-else>❌</span>
    </div>
    <button v-for="option in options" :key="option" @click="selectOption(option)" :class="{
      selected: selectedOption === option,
      disabled: alreadyAnswered,
      a: option === 'A',
      b: option === 'B',
      c: option === 'C',
      d: option === 'D',
    }">
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { quizAnswer } from '@/gateway';
// import { inQuiz } from '@/states/quiz';
import { alreadyAnswered, answerCorrect, options, selectedOption } from '@/states/quiz';

const selectOption = (option: string) => {
  if (alreadyAnswered.value) {
    return;
  }
  quizAnswer(option.toLowerCase());
  alreadyAnswered.value = true;
  selectedOption.value = option.toLowerCase();
};
</script>

<style scoped>
.quiz-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  height: 100%;
}

.options button {
  width: 100%;
  height: 100%;
  font-size: 2rem;
  font-weight: bold;
  border: 1px solid #fff;
  cursor: pointer;
  transition: background-color 0.3s;
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
  /* 真ん中に大きく表示 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  font-weight: bold;

}
</style>
