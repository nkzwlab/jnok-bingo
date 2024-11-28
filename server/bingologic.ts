export function generateNewNumber(existingNumber: number[]): number {
  let num = Math.floor(Math.random() * 75) + 1;
  while (existingNumber.includes(num)) {
    num = Math.floor(Math.random() * 75) + 1;
  }
  return num;
}
