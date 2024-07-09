export function generateBingoArray(): number[][] {
  const range = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
  ];
  // DO NOT ALLOW DUPLICATE NUMBERS
  const bingoArray: number[][] = [];
  for (let i = 0; i < 5; i++) {
    const row: number[] = [];
    for (let j = 0; j < 5; j++) {
      const min = range[j][0];
      const max = range[j][1];
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      while (row.includes(num)) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      row.push(num);
    }
    bingoArray.push(row);
  }
  bingoArray[2][2] = 0;
  return bingoArray;
}
