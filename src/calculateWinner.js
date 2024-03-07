export function findBoardsWon(gamePosition) {
  let boardsWon = Array(9).fill(null);
  for (let i = 0; i < gamePosition.length; i++) {
    const winner = calculateWinner(gamePosition[i]);
    if (winner) {
      if (winner === "draw") {
        boardsWon[i] = "draw";
      } else {
        boardsWon[i] = winner[0];
      }
    }
  }
  return boardsWon;
}

export const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] !== "draw"
    ) {
      return [squares[a], a, b, c];
    }
  }

  if (!squares.includes(null)) {
    return "draw";
  }

  return false;
}
