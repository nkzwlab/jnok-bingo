import { Server } from "npm:socket.io";
import { ref, watch } from "npm:vue";
import { generateNewNumber } from "./bingologic.ts";

const io = new Server({
  cors: {
    origin: "*",
  },
});
const adminIo = new Server({
  cors: {
    origin: "*",
  },
});

const latestNumber = ref<number | null>(null);

io.on("connection", (socket) => {
  // console.log(`socket ${socket.id} connected`);
  // socket.on("disconnect", (reason) => {
  //   console.log(`socket ${socket.id} disconnected due to ${reason}`);
  // });
  socket.on(
    "updateUser",
    (data: {
      name: string;
      status: number;
      uuid: string;
      currentNumber: number;
    }) => {
      currentUsersStatus.value[data.uuid] = {
        name: data.name,
        status: data.status,
        currentNumber: data.currentNumber,
      };
    }
  );
});

adminIo.on("connection", (socket) => {
  socket.on("newNumber", () => {
    if (oldNumbers.value.length === 75) return;
    latestNumber.value = generateNewNumber(oldNumbers.value);
    oldNumbers.value.push(latestNumber.value);
    io.emit("allNumbers", oldNumbers.value);
    adminIo.emit("nextNumber", latestNumber.value);
    adminIo.emit("allNumbers", oldNumbers.value);
  });

  socket.on("resetAll", () => {
    oldNumbers.value = [];
    latestNumber.value = null;
    currentUsersStatus.value = {};
  });
});

const currentUsersStatus = ref<{
  [key: string]: { name: string; status: number; currentNumber: number };
}>({});

watch(
  [currentUsersStatus, latestNumber],
  () => {
    const BingoPeople = Object.values(currentUsersStatus.value)
      .filter((user) => user.status === 0)
      .filter((user) => user.currentNumber === latestNumber.value)
      .map((user) => user.name);
    const ReachPeople = Object.values(currentUsersStatus.value)
      .filter((user) => user.status === 1)
      .map((user) => user.name);
    adminIo.emit("updateBingoPeople", {
      BingoPeople,
      ReachPeople,
    });
  },
  { deep: true }
);

const oldNumbers = ref<number[]>([]);

io.listen(8000);
adminIo.listen(8001);

console.log("Server started");
