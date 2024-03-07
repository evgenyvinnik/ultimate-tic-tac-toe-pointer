import PlayAsXToggle from "./playAsXToggle";

export default function HostMenu({ playerIsX, togglePlayerisX }) {
  return (
    <div>
      <h2>Host Game:</h2>
      <p>
        Join code: <input readonly />
      </p>
      <p>
        or <button className="resetButton">copy game link</button>
      </p>
      <PlayAsXToggle playerIsX={playerIsX} togglePlayerisX={togglePlayerisX} />
      <p style={{ color: "red", fontSize: "0.7rem" }}>
        Waiting for other player to join
      </p>
    </div>
  );
}
