<template>
  <div id="chat-view">
    <div class="messages-container">
      <div v-for="message in messages" :key="message.id" class="message">
        <span>{{ message.name }}:</span>
        <span>
          {{ message.message }}
        </span>
      </div>
    </div>
    <div class="chat-form">
      <!-- send on enter -->
      <input v-model="messageForm" @keyup.enter="sendChat" style="flex-grow: 1;">
      <button @click="sendChat">送信</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sendChat as _sendChat } from '@/gateway';
import { name } from '@/states';
import { messages } from '@/states/chat';
import { nextTick } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';

let messageForm = ref('');
function sendChat() {
  _sendChat(name.value, messageForm.value);
  messageForm.value = '';
}
// when messages change, scroll to bottom
watch(messages,
  () => {
    nextTick(() => {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  },
  { immediate: true }
);
</script>

<style>
#chat-view {
  width: 20%;
  height: 100%;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: scroll;
  padding-right: 10px;
  /* スクロールバーと内容が重ならないように */
}

.message {
  margin-bottom: 5px;
}

.chat-form {
  display: flex;
  /* viewをできるだけ拡大する */
  flex-shrink: 0;

}
</style>
