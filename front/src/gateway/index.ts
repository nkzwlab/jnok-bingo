import { io } from "socket.io-client";
import { watch } from "vue";
import { currentNumber, name, currentStatus, uuid } from "@/states";
import { isDev } from "@/utils/is_dev";

const socket = io(isDev ? "http://localhost:8000" : "/", {
  path: isDev ? "/socket.io" : "/user-socket/socket.io",
});

socket.on("nextNumber", (number: number) => {
  currentNumber.value = number;
});

watch([name, currentStatus], ([newName, newStatus]) => {
  socket.emit("updateUser", {
    name: newName,
    status: newStatus,
    uuid: uuid.value,
    currentNumber: currentNumber.value,
  });
});
