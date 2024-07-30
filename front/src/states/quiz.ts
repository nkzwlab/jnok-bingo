import { useLocalStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { serializer } from ".";

export const inQuiz = ref<string | null>(null);
export const correctAnswer = ref<string | null>(null);

export const alreadyAnswered = ref(false);
export const options = ref(["A", "B", "C", "D"]);
export const selectedOption = ref<string | null>(null);
export const answerCorrect = ref<boolean | null>(null);

export const quizResults = useLocalStorage<{
  correct: number;
  incorrect: number;
}>(
  "quizResults",
  {
    correct: 0,
    incorrect: 0,
  },
  {
    serializer: {
      read: (v: any) => (v ? JSON.parse(atob(v)) : null),
      write: (v: any) => btoa(JSON.stringify(v)),
    },
  },
);

export function incresaseCorrect() {
  quizResults.value.correct++;
}

export function incresaseIncorrect() {
  quizResults.value.incorrect++;
}

export const showQuizResult = computed(() => {
  console.log(quizResults.value);
  return quizResults.value.correct + quizResults.value.incorrect > 0;
});
