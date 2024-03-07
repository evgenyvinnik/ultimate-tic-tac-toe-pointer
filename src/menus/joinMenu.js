import { useState } from "react";

export default function JoinMenu({ setStatus }) {
  const [codeInput, setCodeInput] = useState("");
  const [joinClicked, setJoinClicked] = useState(false);

  function handleInputChange(e) {
    setCodeInput(e.target.value);
  }

  //todo handle joinclicked

  return (
    <div>
      <h2>Join Game:</h2>
      <p>
        Join code: <input value={codeInput} onChange={handleInputChange} />
      </p>
      <button
        className="resetButton"
        disabled={codeInput.length !== 5 || joinClicked}
      >
        Join
      </button>
    </div>
  );
}
