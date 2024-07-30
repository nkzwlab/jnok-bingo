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
  /* box-sizing */
  box-sizing: border-box;
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
  gap: 10px;

}

.chat-form button {
  /* viewをできるだけ拡大する */
  flex-shrink: 0;
  /* ボタンの高さをinputの高さに合わせる */
  align-self: stretch;
  /* ボタンの幅を固定する */
  width: 60px;
  /* ボタンの高さを固定する */
  height: 52px;
  /* ボタンの背景色 */
  background-color: #4CAF50;
  /* ボタンの文字色 */
  color: white;
  /* ボタンの角丸 */
  border-radius: 5px;
  /* ボタンの文字の位置 */
  text-align: center;
  /* ボタンの文字の位置 */
  text-decoration: none;
  /* ボタンの文字の位置 */
  display: inline-block;
  /* ボタンの文字の位置 */
  font-size: 16px;
  /* ボタンの文字の位置 */
  cursor: pointer;
  /* ボタンの文字の位置 */
  border: none;
  /* ボタンの文字の位置 */
  border-radius: 5px;
  /* ボタンの文字の位置 */
  box-sizing: border-box;
  /* ボタンの文字の位置 */
  padding: 5px;
  /* ボタンの文字の位置 */
  font-size: 16px;
  /* ボタンの文字の位置 */
  font-weight: bold;
  /* ボタンの文字の位置 */
  text-align: center;
  /* ボタンの文字の位置 */
  text-decoration: none;
  /* ボタンの文字の位置 */
  display: inline-block;
  /* ボタンの文字の位置 */
  font-size: 16px;
  /* ボタンの文字の位置 */
  cursor: pointer;
  /* ボタンの文字の位置 */
  border: none;
  /* ボタンの文字の位置 */
  border-radius: 5px;
}

.chat-form {
  display: flex;
  /* viewをできるだけ拡大する */
  flex-shrink: 0;
  gap: 10px;
}
</style>
