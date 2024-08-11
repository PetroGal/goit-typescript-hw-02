import css from './ImageCard.module.css';
import { Image } from '../../types';

interface ImageCardProps {
  photo: Image;
}

export default function ImageCard({ photo }: ImageCardProps) {
  const {
    alt_description,
    urls: { small },
  } = photo;
  return (
    <div className={css.cardContainer}>
      <img className={css.listImage} src={small} alt={alt_description} />
    </div>
  );
}
