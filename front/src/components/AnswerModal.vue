<template>
  <div class="answer-modal">
    <h1 class="quiz-description">Q. {{ quizDescription }} {{ countdown }}
    </h1><br>
    <h3>
      {{ fastest }}</h3>
    <div class="container">
      <div v-for="item in currentQuizItems" :key="item.id"
        :class='{ "card": true, "correct": item.id.toLowerCase() === answer }'>
        <div class="image-box">
          <img :src="item.img" alt="image" class="image" />
        </div>
        <div class="info-wrapper">
          <div class="label" :class="'label-' + item.label">{{ item.id }}</div>
          <div class="desc">{{ answerRevealed ? item.desc : "" }}</div>
          <div class="info">{{ answerRevealed ? item.count : "" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { answer, answerRevealed, currentQuizItems, fastest, quizDescription } from '@/states/quizData';
import { onMounted } from 'vue';
import { ref, } from 'vue';

const countdown = ref(20);
onMounted(() => {
  countdown.value = 20;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(timer);
    }
  }, 1000);
}
)

</script>

<style scoped>
.quiz-description {
  font-size: 70px;
  margin: 0px;
}

.answer-modal {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.container {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
}

.card {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card.correct {
  /* 薄い黄色 */
  background-color: #ffffcc;
}

.image-box {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.image-box img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  left: 0px;
  right: 0px;
}

.info-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}

.label {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
}

.label-a {
  background-color: #ff9999;
}

.label-b {
  background-color: #99ccff;
}

.label-c {
  background-color: #99ff99;
}

.label-d {
  background-color: #ffcc99;
}

.desc {
  flex-grow: 1;
  color: black;
}

.info {
  font-size: 18px;
  text-align: left;
  color: black;
}
</style>
