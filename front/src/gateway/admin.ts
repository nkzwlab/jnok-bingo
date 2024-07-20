import { io } from "socket.io-client";
import { allNumbers, bingoPeople } from "@/states/admin";
import { isDev } from "@/utils/is_dev";
import {
  answerRevealed,
  currentQuizItems,
  fastest,
  quizModalOpen,
} from "@/states/quizData";

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

adminSocket.on(
  "adminQuizEnd",
  async (data: {
    quizId: string;
    counts: { [key: string]: number };
    fastest: {
      userAnswer: string | undefined;
      timestamp: number | undefined;
      username: string | undefined;
    };
  }) => {
    ["a", "b", "c", "d"].forEach((key) => {
      currentQuizItems.value.find((item) => item.label === key)!.count =
        data.counts[key];
    });
    answerRevealed.value = true;

    if (
      data.fastest.userAnswer != undefined &&
      data.fastest.timestamp != undefined &&
      data.fastest.username != undefined
    ) {
      const timestampInSec = data.fastest.timestamp / 1000;
      fastest.value = `最速回答は${data.fastest.username}さんの、${timestampInSec}秒でした！`;
    }

    await new Promise((resolve) => setTimeout(resolve, 10 * 3000));
    answerRevealed.value = false;
    quizModalOpen.value = false;
    fastest.value = "";
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

export function emitQuizStart(quizId: string) {
  adminSocket.emit("quizStart", quizId);
}
