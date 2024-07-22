/* const answers: { [key: string]: string } = {
  q1: "b",
  q2: "a",
  q3: "c",
  q4: "c",
}; */

import { emitQuizStart } from "@/gateway/admin";
import { ref } from "vue";

/*  {
    id: "A",
    label: "a",
    count: 13,
    desc: "s",
    img: "https://via.placeholder.com/150",
  }, */

export const quizModalOpen = ref(false);

export const answerRevealed = ref(false);
export const answer = ref<null | "a" | "b" | "c" | "d">(null);

export const quizDescription = ref("");
export const fastest = ref("");

export const currentQuizItems = ref<QuizItem[]>([
  {
    id: "A",
    label: "a",
    count: 13,
    desc: "s",
    img: "https://via.placeholder.com/150",
  },
  {
    id: "B",
    label: "b",
    count: 10,
    desc: "s",
    img: "https://via.placeholder.com/150",
  },
  {
    id: "C",
    label: "c",
    count: 13,
    desc: "s",
    img: "https://via.placeholder.com/150",
  },
  {
    id: "D",
    label: "d",
    count: 12,
    desc: "s",
    img: "https://via.placeholder.com/150",
  },
]);

export function quizStart(quizId: string) {
  quizModalOpen.value = true;
  emitQuizStart(quizId);
  currentQuizItems.value = allQuizItems[quizId].selections;
  quizDescription.value = allQuizItems[quizId].desc;
}

type QuizItem = {
  id: "A" | "B" | "C" | "D";
  label: "a" | "b" | "c" | "d";
  count?: number;
  desc: string;
  img: string;
};

/* Q1
desc ["ミシシッピ州(米国),藤沢市,長野県,モルドバ共和国"]
*/

const allQuizItems: {
  [key: string]: { desc: string; selections: QuizItem[] };
} = {
  q1: {
    desc: "藤沢市はどれ？",
    selections: [
      {
        id: "A",
        label: "a",
        desc: "ミシシッピ州",
        img: "/imgs/q1a.png",
      },
      {
        id: "B",
        label: "b",
        desc: "藤沢市",
        img: "/imgs/q1b.png",
      },
      {
        id: "C",
        label: "c",
        desc: "長野県",
        img: "/imgs/q1c.png",
      },
      {
        id: "D",
        label: "d",
        desc: "モルドバ共和国",
        img: "/imgs/q1d.png",
      },
    ],
  },
  q2: {
    desc: "slashはどれ？",
    selections: [
      {
        id: "A",
        label: "a",
        desc: "スラッシュ",
        img: "/imgs/q2a.jpg",
      },
      {
        id: "B",
        label: "b",
        desc: "ジ・エッジ",
        img: "/imgs/q2b.jpg",
      },
      {
        id: "C",
        label: "c",
        desc: "ジミ・ヘンドリックス",
        img: "/imgs/q2c.jpg",
      },
      {
        id: "D",
        label: "d",
        desc: "ブライアン・メイ",
        img: "/imgs/q2d.jpg",
      },
    ],
  },
  q3: {
    desc: "遠藤よりもレアな苗字は？",
    selections: [
      {
        id: "A",
        label: "a",
        desc: "石井",
        img: "/imgs/q3a.png",
      },
      {
        id: "B",
        label: "b",
        desc: "後藤",
        img: "/imgs/q3b.png",
      },
      {
        id: "C",
        label: "c",
        desc: "高田",
        img: "/imgs/q3c.png",
      },
      {
        id: "D",
        label: "d",
        desc: "池田",
        img: "/imgs/q3d.png",
      },
    ],
  },
  q4: {
    desc: "SFCに在学経験がないのは？",
    selections: [
      {
        id: "A",
        label: "a",
        desc: "トリンドル玲奈",
        img: "/imgs/q4a.jpg",
      },
      {
        id: "B",
        label: "b",
        desc: "山縣亮太",
        img: "/imgs/q4b.jpg",
      },
      {
        id: "C",
        label: "c",
        desc: "落合陽一",
        img: "/imgs/q4c.jpg",
      },
      {
        id: "D",
        label: "d",
        desc: "サワ（サワヤンゲームズ）",
        img: "/imgs/q4d.jpg",
      },
    ],
  },
  q5: {
    desc: "答えはDです",
    selections: [
      {
        id: "A",
        label: "a",
        count: 13,
        desc: "s",
        img: "https://via.placeholder.com/150",
      },
      {
        id: "B",
        label: "b",
        count: 10,
        desc: "s",
        img: "https://via.placeholder.com/150",
      },
      {
        id: "C",
        label: "c",
        count: 13,
        desc: "s",
        img: "https://via.placeholder.com/150",
      },
      {
        id: "D",
        label: "d",
        count: 12,
        desc: "s",
        img: "https://via.placeholder.com/150",
      },
    ],
  },
};
