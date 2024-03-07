import { lines } from "../calculateWinner";

export function calculateOverallScore(position) {
  let scores = [];
  let bigScore = 0;
  position.forEach((board) => {
    scores.push(calculateMiniBoardScore(board));
  });
  lines.forEach((line) => {
    let positiveProduct = 1;
    let negativeProduct = 1;
    for (let i = 0; i < 3; i++) {
      if (scores[line[i]] > 0) {
        positiveProduct *= scores[line[i]];
      }
      if (scores[line[i]] < 0) {
        negativeProduct *= scores[line[i]];
      }
    }
    negativeProduct = -1 * Math.abs(negativeProduct);

    bigScore += positiveProduct + negativeProduct;
  });
  return bigScore;
}

function calculateMiniBoardScore(board) {
  let score = 0;
  lines.forEach((line) => {
    score += calculateLineScore(line, board);
  });

  return score;
}

function calculateLineScore(line, board) {
  let xCount = 0;
  let oCount = 0;
  for (let i = 0; i < 3; i++) {
    if (board[line[i]] === "X") {
      xCount++;
    } else if (board[line[i]] === "O") {
      oCount++;
    }
  }

  if (xCount === 3) return 60;
  if (oCount === 3) return -60;
  if (xCount === 2 && oCount === 0) return 10;
  if (oCount === 2 && xCount === 0) return -10;
  if (xCount === 1 && oCount === 0) return 1;
  if (oCount === 1 && xCount === 0) return -1;
  return 0;
}
