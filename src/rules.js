import { useState } from "react";

function RulesButton({ toggleVisible, rulesVisible }) {
  let buttonText = "Rules ⋁";
  if (rulesVisible === "block") {
    buttonText = "Rules ⋀";
  }
  return (
    <button className="rulesButton" onClick={toggleVisible}>
      {buttonText}
    </button>
  );
}

export default function Rules() {
  const [rulesVisible, setRulesVisible] = useState("none");

  function toggleVisible() {
    if (rulesVisible === "none") {
      setRulesVisible("block");
    } else {
      setRulesVisible("none");
    }
  }

  return (
    <div className="rulesContainer">
      <RulesButton toggleVisible={toggleVisible} rulesVisible={rulesVisible} />
      <div id="rules" style={{ display: rulesVisible }}>
        <RulesText />
      </div>
    </div>
  );
}

function RulesText() {
  return (
    <ul className="rulesText">
      <li>
        Each small 3 × 3 tic-tac-toe board is referred to as a local board, and
        the larger 3 × 3 board is referred to as the global board.
      </li>
      <li>
        The game starts with X playing wherever they want in any of the 81 empty
        spots.
      </li>
      <li>
        This move "sends" their opponent to its relative location on the global
        board. For example, if X played in the top right square of their local
        board, then O needs to play next in the local board at the top right of
        the global board.
      </li>
      <li>
        O can then play in any one of the nine available spots in that local
        board, each move sending X to a different local board.
      </li>
      <li>
        If a move is played so that it is to win a local board by the rules of
        normal tic-tac-toe, then the entire local board is marked as a victory
        for the player in the global board.
      </li>
      <li>
        Once a local board is won by a player or it is filled completely, no
        more moves may be played in that board.
      </li>
      <li>
        If a player is sent to such a board, then that player may play in any
        other board.
      </li>
      <li>
        Game play ends when either a player wins the global board or there are
        no legal moves remaining, in which case the game is a draw.
      </li>
    </ul>
  );
}
