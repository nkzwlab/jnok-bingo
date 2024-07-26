export function generateBingoArray(): number[][] {
  const range = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
  ];

  const bingoArray: number[][] = [];
  const usedNumbers: Set<number>[] = Array.from(
    { length: 5 },
    () => new Set<number>(),
  );

  for (let i = 0; i < 5; i++) {
    const row: number[] = [];
    for (let j = 0; j < 5; j++) {
      if (i === 2 && j === 2) {
        row.push(0); // 中央はフリー
        continue;
      }

      const min = range[j][0];
      const max = range[j][1];
      let num = Math.floor(Math.random() * (max - min + 1)) + min;

      while (usedNumbers[j].has(num)) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      }

      usedNumbers[j].add(num);
      row.push(num);
    }
    bingoArray.push(row);
  }

  return bingoArray;
}
