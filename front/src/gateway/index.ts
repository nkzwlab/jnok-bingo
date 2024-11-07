import { io } from "socket.io-client";
import { watch } from "vue";
import {
  allNumbers,
  name,
  currentStatus,
  uuid,
  stealCell,
  BingoCellStatus,
} from "@/states";
import { isDev } from "@/utils/is_dev";
import { messages } from "@/states/chat";
import {
  alreadyAnswered,
  answerCorrect,
  correctAnswer,
  incresaseCorrect,
  incresaseIncorrect,
  inQuiz,
  selectedOption,
} from "@/states/quiz";
import { showAnswerModalSeconds } from "@/consts";

const socket = io(isDev ? "http://localhost:8000" : "/", {
  path: isDev ? "/socket.io" : "/user-socket/socket.io",
});

socket.on("allNumbers", (numbers: number[]) => {
  allNumbers.value = numbers;
});

watch([name, currentStatus], ([newName, newStatus]) => {
  socket.emit("updateUser", {
    name: newName,
    status: newStatus,
    uuid: uuid.value,
    currentNumber: allNumbers.value[allNumbers.value.length - 1],
  });
});

export function sendChat(name: string, message: string) {
  socket.emit("chat", { name, message });
}

export function quizAnswer(answer: string) {
  /* socket.on("answer", (data: { answer: string; uuid: string }) => {
    addAnswer(data.answer, data.uuid);
  }); */

  /* socket.on("answer", (data: { answer: string; uuid: string userName: string }) => { */
  socket.emit("answer", { answer, uuid: uuid.value, userName: name.value });
}

socket.on("chat", (data: { name: string; message: string; id: string }) => {
  messages.push(data);
});

socket.on("quizStart", (quizId: string) => {
  inQuiz.value = quizId;
});
/* io.emit("userQuizEnd", {
    answer,
  }); */

// eventemitter

socket.on("userQuizEnd", async (data: { answer: string }) => {
  /* 
export const inQuiz = ref(false);

export const alreadyAnswered = ref(false);
export const selectedOption = ref<string | null>(null);
export const answerCorrect = ref<boolean | null>(null);
 */

  answerCorrect.value = data.answer === selectedOption.value;
  alreadyAnswered.value = true;
  correctAnswer.value = data.answer;
  if (answerCorrect.value) {
    incresaseCorrect();
  } else {
    incresaseIncorrect();
    stealCell(
      answerCorrect.value ? BingoCellStatus.Marked : BingoCellStatus.Stolen,
    );
  }
  await new Promise((resolve) =>
    setTimeout(resolve, showAnswerModalSeconds * 1000),
  );
  inQuiz.value = null;
  selectedOption.value = null;
  answerCorrect.value = null;
  correctAnswer.value = null;
  alreadyAnswered.value = false;
});
