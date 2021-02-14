import "./Button.css";

export default function Button({ state, show }) {
  return (
    <button className="btn" onClick={() => show(!state)}>
      Show Data
    </button>
  );
}