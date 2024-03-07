export default function Header({ setStatus, welcome = false }) {
  return (
    <h1 className="header">
      <span className="headerText">Ultimate Tic-Tac-Toe</span>
      {!welcome && BackButton({ setStatus })}
    </h1>
  );
}

function BackButton({ setStatus }) {
  return (
    <button className="resetButton" onClick={() => setStatus("welcomeMenu")}>
      Home
    </button>
  );
}
