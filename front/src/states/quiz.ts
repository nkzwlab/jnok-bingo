import { ref } from "vue";

export const inQuiz = ref<string|null>(null);

export const alreadyAnswered = ref(false);
export const options = ref(["A", "B", "C", "D"]);
export const selectedOption = ref<string | null>(null);
export const answerCorrect = ref<boolean | null>(null);
