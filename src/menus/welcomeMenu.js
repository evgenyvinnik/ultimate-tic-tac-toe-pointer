export default function WelcomeMenu({ setStatus }) {
  return (
    <div>
      <h2>Select game mode:</h2>
      <button
        className="resetButton"
        onClick={() => {
          setStatus("localGame");
        }}
      >
        2 player shared screen
      </button>
      <button
        className="resetButton"
        onClick={() => {
          setStatus("networkMenu");
        }}
      >
        2 player online
      </button>
      <button
        className="resetButton"
        onClick={() => {
          setStatus("aiMenu");
        }}
      >
        Play against the computer
      </button>
    </div>
  );
}
