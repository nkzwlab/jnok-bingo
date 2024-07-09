import { io } from "socket.io-client";
import { allNumbers, bingoPeople } from "@/states/admin";
import { isDev } from "@/utils/is_dev";

const adminSocket = io(isDev ? "http://localhost:8001" : "/", {
  path: isDev ? "/socket.io" : "/admin-socket/socket.io",
});

adminSocket.on(
  "updateBingoPeople",
  (data: { BingoPeople: string[]; ReachPeople: string[] }) => {
    bingoPeople.value = {
      bingo: data.BingoPeople,
      reach: data.ReachPeople,
    };
  },
);

adminSocket.on("allNumbers", (numbers: number[]) => {
  allNumbers.value = numbers;
});

export function newNumber() {
  adminSocket.emit("newNumber");
}

export function resetAll() {
  adminSocket.emit("resetAll");
}
