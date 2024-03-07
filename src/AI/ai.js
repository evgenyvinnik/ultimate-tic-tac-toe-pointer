import { calculateOverallScore } from "./calculatePositionScore";
import { findBoardsWon, calculateWinner } from "../calculateWinner";

function possibleMoves(lastMove, gamePosition) {
  let finishedBoards = findBoardsWon(gamePosition);

  let possibleBoards = Array(9).fill(null);
  if (finishedBoards[lastMove] || lastMove === null) {
    possibleBoards = finishedBoards.map((board) => !board);
  } else {
    possibleBoards[lastMove] = true;
  }

  let possibleMovesArray = [];
  for (let i = 0; i < gamePosition.length; i++) {
    if (possibleBoards[i]) {
      for (let j = 0; j < 9; j++) {
        if (!gamePosition[i][j]) {
          possibleMovesArray.push([i, j]);
        }
      }
    }
  }
  return possibleMovesArray;
}

export function minMaxMove(lastMove, gamePosition, xNext, depth = 0) {
  const possibleMovesArray = possibleMoves(lastMove, gamePosition);
  let scores = [];
  possibleMovesArray.forEach((move) => {
    let nextPosition = structuredClone(gamePosition);
    if (xNext) {
      nextPosition[move[0]][move[1]] = "X";
    } else {
      nextPosition[move[0]][move[1]] = "O";
    }
    const winner = calculateWinner(findBoardsWon(nextPosition));
    if (winner && winner[0] === "X") {
      scores.push(1000000);
    } else if (winner && winner[0] === "O") {
      scores.push(-1000000);
    } else {
      let positionScore = calculateOverallScore(nextPosition);
      if (depth > 1) {
        scores.push(minMaxMove(move[1], nextPosition, !xNext, depth - 1)[0]);
      } else {
        scores.push(positionScore);
      }
    }
  });

  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const minMove = possibleMovesArray[scores.indexOf(minScore)];
  const maxMove = possibleMovesArray[scores.indexOf(maxScore)];

  //return minmove minscore maxmove maxscore
  if (xNext) {
    return [maxScore, maxMove];
  }
  return [minScore, minMove];
}
