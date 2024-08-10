import css from './LoadMoreBtn.module.css';

export default function Button({ children, onClick, disabled }) {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
