import css from './ImageCard.module.css';

export default function ImageCard({
  photo: {
    alt_description,
    urls: { small },
  },
}) {
  return (
    <div className={css.cardContainer}>
      <img className={css.listImage} src={small} alt={alt_description} />
    </div>
  );
}
