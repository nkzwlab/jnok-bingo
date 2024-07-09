import { io } from "socket.io-client";
import { watch } from "vue";
import { currentNumber, name, currentStatus, uuid, Status } from "@/states";

const socket = io("http://localhost:8000");
socket.on("nextNumber", (number: number) => {
  currentNumber.value = number;
});

watch([name, currentStatus], ([newName, newStatus]) => {
  if (newStatus !== Status.None) {
    socket.emit("updateUser", {
      name: newName,
      status: newStatus,
      uuid: uuid.value,
    });
  }
});

export function newNumber() {
  console.log("newNumber");
  socket.emit("newNumber");
}
