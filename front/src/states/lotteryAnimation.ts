let intervalId: NodeJS.Timeout | undefined

export function starLotteryAnimation(existingNumbers: number[], interval: (randomNumber: number) => void) {
  intervalId = setInterval(() => {
    const randomNumber = getRemainingRandom(existingNumbers)
    interval(randomNumber)
  }, 80)
}

export function stopLotteryAnimation() {
  clearInterval(intervalId)
}

// 既に出た数字を除いたランダム数字を取得
function getRemainingRandom(existingNumbers: number[]) {
  const fullNumbers = [...Array(75)].map((_, i) => i + 1)
  const nonExistNumbers = fullNumbers.filter((num) => !existingNumbers.includes(num))

  return nonExistNumbers[Math.floor(Math.random() * nonExistNumbers.length)]
}