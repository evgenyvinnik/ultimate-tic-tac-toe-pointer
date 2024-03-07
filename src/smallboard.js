import Square from "./square.js";

export default function SmallBoard({
  updateGame,
  thisBoard,
  squares,
  boardState
}) {
  function handleClick(i) {
    if (squares[i] || boardState !== "current") {
      return;
    }
    squares = updateGame(thisBoard, i);
  }

  let rows = [];
  for (let i = 0; i < 3; i++) {
    let squareArray = [];
    for (let j = 0; j < 3; j++) {
      let k = i * 3 + j;
      let className = "square";
      if (boardState === "current" || boardState === "winning line") {
        className += " highlighted";
      }
      if (boardState === "draw") {
        className += " greyed";
      }
      squareArray.push(
        <Square
          className={className}
          value={squares[k]}
          onSquareClick={() => handleClick(k)}
          key={k + "Square" + thisBoard}
        />
      );
    }
    rows.push(
      <div className="board-row" key={i + "row" + thisBoard}>
        {squareArray}
      </div>
    );
  }

  return <>{rows}</>;
}
