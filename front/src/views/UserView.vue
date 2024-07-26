<template>
  <div class="view-container">
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
      <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal">
        <div class="modal-content" @click.stop>
          <input v-model="name" placeholder="Enter your name" />
          <button @click="toggleModal">Close</button>
        </div>
      </div>
      <div v-if="inQuiz" class="quiz-modal">
        <QuizModal />
      </div>
    </div>
    <ChatView v-if="showChat" class="chat-view" />
    <div class="floating-chat-btn-container" :class="{ 'chat-on': showChat }">
      <button class="floating-chat-btn chat" @click="showChat = !showChat">Chat</button>
      <button class="floating-chat-btn" @click="toggleModal">名前を入力</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BingoUI from '../components/BingoGrid.vue';
import { allNumbers, checkIfToReset, grid, name } from '@/states';
import ChatView from '@/components/ChatView.vue';
import { inQuiz } from '@/states/quiz';
import QuizModal from '@/components/QuizModal.vue';
import { onMounted } from 'vue';

const isModalOpen = ref(true);

const toggleModal = () => {
  if (name.value) {
    isModalOpen.value = !isModalOpen.value;
  }
};

const numberHistory = computed(() => allNumbers.value.slice(0, -1).reverse().join(', '));
const currentNumber = computed(() => allNumbers.value[allNumbers.value.length - 1]);

const showChat = ref(false);

onMounted(() => {
  checkIfToReset()
})
</script>

<style scoped>
.view-container {
  height: 100vh;
  display: flex;
  background-color: #000;
}

.wrapper {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.chat-view {
  width: 20%;
  height: 100vh;
  overflow-y: scroll;
  padding: 10px;
  background-color: white;
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

@media screen and (max-width: 900px) {
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }

  .floating-chat-btn.chat {
    display: none;
  }
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
  /* 左に20%ずらす */
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
  /* precentage */
  width: 80%;
  height: 90%;
}
</style>
