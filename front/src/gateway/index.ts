import { io } from "socket.io-client";
import { watch } from "vue";
import { allNumbers, name, currentStatus, uuid } from "@/states";
import { isDev } from "@/utils/is_dev";
import { messages } from "@/states/chat";

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

socket.on("chat", (data: { name: string; message: string; id: string }) => {
  console.log(data);
  messages.push(data);
});
