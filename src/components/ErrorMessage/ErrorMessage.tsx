import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.messageWrap}>
      <p className={css.message}>{message}</p>
    </div>
  );
}
