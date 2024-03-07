export default function PlayAsXToggle({ playerIsX, togglePlayerisX }) {
  return (
    <div className="buttonsDiv">
      <p className="lowerText">Play as X</p>
      <label className="switch">
        <input
          type="checkbox"
          checked={!playerIsX}
          onChange={() => togglePlayerisX()}
        />
        <span className="slider round"></span>
      </label>
      <p className="lowerText">Play as O</p>
    </div>
  );
}
