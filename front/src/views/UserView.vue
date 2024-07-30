<template>
  <div class="view-container" :class="{ 'mobile': isMobile }">
    <div class="wrapper" :class="{ 'mobile': isMobile }" v-if="!isMobile || currentTab === 'bingo'">
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
    </div>
    <ChatView v-if="(!isMobile && showChat) || (isMobile && currentTab === 'chat')" class="chat-view"
      :class="{ 'mobile': isMobile }" />
    <div class="floating-chat-btn-container" v-if="!isMobile" :class="{ 'chat-on': showChat }">
      <button class="floating-chat-btn chat" @click="showChat = !showChat">Chat</button>
      <button class="floating-chat-btn" @click="toggleModal">名前を入力</button>
    </div>
    <div v-if="isMobile" class="bottom-tab-bar">
      <button @click="currentTab = 'bingo'" :class="{ active: currentTab === 'bingo' }">Bingo</button>
      <button @click="currentTab = 'chat'" :class="{ active: currentTab === 'chat', }">Chat</button>
      <button @click="toggleModal">名前を入力</button>
    </div>
    <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal">
      <div class="modal-content" @click.stop>
        <input v-model="name" placeholder="Enter your name" />
        <div v-if="showQuizResult">
          <div>正解したクイズ数: {{ quizResults.correct }}</div>
          <div>不正解だったクイズ数: {{ quizResults.incorrect }}</div>
          <br />
        </div>
        <button @click="toggleModal">Close</button>
      </div>
    </div>
    <div v-if="inQuiz" class="quiz-modal">
      <QuizModal />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import BingoUI from '../components/BingoGrid.vue';
import { allNumbers, checkIfToReset, grid, name } from '@/states';
import ChatView from '@/components/ChatView.vue';
import { inQuiz, showQuizResult, quizResults } from '@/states/quiz';
import QuizModal from '@/components/QuizModal.vue';

const isModalOpen = ref(true);
const showChat = ref(false);
const currentTab = ref('bingo');

const toggleModal = () => {
  if (name.value) {
    isModalOpen.value = !isModalOpen.value;
  }
};

const numberHistory = computed(() => allNumbers.value.slice(0, -1).reverse().join(', '));
const currentNumber = computed(() => allNumbers.value[allNumbers.value.length - 1]);

const isMobile = ref(window.innerWidth <= 900);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 900;
};

onMounted(() => {
  checkIfToReset();
  window.addEventListener('resize', handleResize);
});

</script>
<style scoped>
.view-container {
  height: 100vh;
  display: flex;
  background-color: #000;
}

.view-container.mobile {
  flex-flow: column;
  height: 100svh;
}

.wrapper {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.wrapper.mobile {
  flex-flow: column;
}

.chat-view {
  width: 20%;
  height: 100vh;
  overflow-y: scroll;
  padding: 10px;
  background-color: white;
}

#chat-view.mobile {
  width: 100%;

}

.current-number {
  margin-top: 16px;
  font-size: 40px;
  color: #fff;
  text-align: center;
}

.bingo-info {
  padding: 0 20px;
}

.result-item {
  display: flex;
  flex-direction: column;
  margin: 24px 0;
  align-items: center;
}

.result-label {
  font-weight: bold;
  color: #ffffff;
  font-size: 16px;
}

.result-content {
  font-size: 24px;
  text-align: center;
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
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.floating-chat-btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.floating-chat-btn:not(:disabled):hover {
  background-color: #0056b3;
}

.floating-chat-btn-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.floating-chat-btn-container.chat-on {
  right: calc(20% + 20px);
}

.quiz-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 80%;
  height: 90%;
}

/* Bottom Tab Bar styles for mobile view */
.bottom-tab-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #333;
  color: white;
}

.bottom-tab-bar button {
  background: none;
  border: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
}

.bottom-tab-bar button.active {
  font-weight: bold;
  border-bottom: 2px solid #fff;
}
</style>
