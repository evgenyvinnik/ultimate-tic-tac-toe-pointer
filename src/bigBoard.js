import { useState } from "react";
import { calculateWinner, findBoardsWon } from "./calculateWinner.js";
import SmallBoard from "./smallboard.js";
import { minMaxMove } from "./AI/ai.js";

export default function BigBoard({ robot, appStatus, playerIsX }) {
  let initalPosition = [];
  for (let i = 0; i < 9; i++) {
    initalPosition.push(Array(9).fill(null));
  }
  const [gamePosition, setGamePosition] = useState(initalPosition);
  const [lastMove, setLastMove] = useState(null);

  let moveCount = 0;
  gamePosition.forEach((board) => {
    board.forEach((square) => {
      if (square) {
        moveCount += 1;
      }
    });
  });

  let xNext = (moveCount + 1) % 2 ? true : false;
  let currentGame = Array(9).fill(true);

  let status = xNext
    ? "X to play in any highlighted square"
    : "O to play in a highlighted square";

  if (appStatus !== "localGame" && xNext !== playerIsX) {
    status = "Waiting for opponent to move...";
  }

  function updateGame(board, position, x = xNext) {
    if (appStatus === "aiGame" && xNext !== playerIsX) return;
    let nextPosition = structuredClone(gamePosition);
    let player = "X";
    if (!x) {
      player = "O";
    }
    nextPosition[board][position] = player;
    setGamePosition(nextPosition);
    setLastMove(position);

    return nextPosition[board];
  }

  const boardsFinished = findBoardsWon(gamePosition);
  let overallWinner = calculateWinner(boardsFinished);

  if (boardsFinished[lastMove] || lastMove === null) {
    currentGame = boardsFinished.map((board) => !board);
  } else {
    currentGame = Array(9).fill(false);
    currentGame[lastMove] = true;
  }

  if (xNext !== playerIsX && appStatus === "aiGame" && !overallWinner) {
    const robotMove = minMaxMove(lastMove + 0, gamePosition, xNext, robot)[1];
    const robotPlayer = playerIsX ? "O" : "X";
    let nextPosition = structuredClone(gamePosition);
    nextPosition[robotMove[0]][robotMove[1]] = robotPlayer;
    setTimeout(() => {
      setGamePosition(nextPosition);
      setLastMove(robotMove[1]);
    }, 1000);
  }

  if (typeof overallWinner === "object") {
    status =
      "Congratulations! Player " +
      overallWinner[0] +
      " won. Would you like to play again?";
  } else if (overallWinner === "draw") {
    status =
      "No more legal moves. The game is a draw. Would you like to play again?";
  }

  let rows = [];
  for (let i = 0; i < 3; i++) {
    let boardArray = [];
    for (let j = 0; j < 3; j++) {
      let k = i * 3 + j;
      let boardState = boardsFinished[k];
      if (typeof overallWinner === "object") {
        if (overallWinner.includes(k)) {
          boardState = "winning line";
        }
      } else if (boardState === null && currentGame[k]) {
        boardState = "current";
      }

      let children = [
        <SmallBoard
          updateGame={updateGame}
          thisBoard={k}
          squares={gamePosition[k]}
          boardState={boardState}
          key={k + "SmallBoard"}
        />
      ];
      if (boardsFinished[k] && boardsFinished[k] !== "draw") {
        children.push(
          <div className="bigScore" key={k + "bigScore"}>
            {boardsFinished[k]}
          </div>
        );
      }
      boardArray.push(<td className="table-column" key={k + "cell"}>{children}</td>);
    }
    rows.push(<tr className="table-row" key={i + "row"}>{boardArray}</tr>);
  }

  return (
    <>
      <div className="status">{status}</div>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}
