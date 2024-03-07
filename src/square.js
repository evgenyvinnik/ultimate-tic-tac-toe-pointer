export default function Square({ className, value, onSquareClick }) {
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}
