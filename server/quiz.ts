import { adminIo, io } from "./main.ts";

const answers: { [key: string]: string } = {
  q1: "b",
  q2: "a",
  q3: "c",
  q4: "c",
};

let acceptingAnswers = false;

const answerMap: {
  [key: string]: {
    userAnswer: string;
    timestamp: number;
  };
} = {};

export async function quizStart(quizId: string) {
  io.emit("quizStart");
  acceptingAnswers = true;
  const timestamp = Date.now();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  acceptingAnswers = false;
  // check answers
  console.log(answerMap);

  const aAnswer = Object.values(answerMap).filter((a) => a.userAnswer === "a");
  const bAnswer = Object.values(answerMap).filter((a) => a.userAnswer === "b");
  const cAnswer = Object.values(answerMap).filter((a) => a.userAnswer === "c");
  const dAnswer = Object.values(answerMap).filter((a) => a.userAnswer === "d");
  const counts = {
    a: aAnswer.length,
    b: bAnswer.length,
    c: cAnswer.length,
    d: dAnswer.length,
  };
  const answer = answers[quizId];
  const answerArr = (() => {
    switch (answer) {
      case "a":
        return aAnswer;
      case "b":
        return bAnswer;
      case "c":
        return cAnswer;
      case "d":
        return dAnswer;
    }
  })() as { userAnswer: string; timestamp: number }[];
  const fastest = (() => {
    if (answerArr) {
      return answerArr.sort((a, b) => a.timestamp - b.timestamp)[0];
    } else {
      return undefined;
    }
  })();

  adminIo.emit("adminQuizEnd", {
    quizId,
    counts,
    fastest: {
      userAnswer: fastest?.userAnswer,
      timestamp: fastest ? fastest.timestamp - timestamp : undefined,
    },
  });

  io.emit("userQuizEnd", {
    answer,
  });
}

export function addAnswer(userAnswer: string, userId: string) {
  console.log("Adding answer1", userId, userAnswer);
  if (!acceptingAnswers) {
    return;
  }
  console.log("Adding answer", userId, userAnswer);

  answerMap[userId] = {
    userAnswer,
    timestamp: Date.now(),
  };
}
