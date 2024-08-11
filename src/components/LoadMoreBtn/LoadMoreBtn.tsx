import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
