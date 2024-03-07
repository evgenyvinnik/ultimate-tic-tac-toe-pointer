import PlayAsXToggle from "./playAsXToggle";

export default function AiMenu({ togglePlayerisX, playerIsX, robotMenuClick }) {
  return (
    <div>
      <h2>Select the AI difficulty level</h2>
      <button
        className="resetButton"
        onClick={() => {
          robotMenuClick(1);
        }}
      >
        Beginner
      </button>
      <button
        className="resetButton"
        onClick={() => {
          robotMenuClick(2);
        }}
      >
        Intermediate
      </button>
      <button
        className="resetButton"
        onClick={() => {
          robotMenuClick(3);
        }}
      >
        Expert
      </button>
      <button
        className="resetButton"
        onClick={() => {
          robotMenuClick(4);
        }}
      >
        Master
      </button>
      <PlayAsXToggle playerIsX={playerIsX} togglePlayerisX={togglePlayerisX} />
    </div>
  );
}
