import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from '../../types';

interface ImageGalleryProps {
  photos: Image[];
  onImageClick: (photo: Image) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onImageClick,
}) => {
  return (
    <ul className={css.gallery}>
      {photos.map(photo => (
        <li
          key={photo.id}
          className={css.listItem}
          onClick={() => onImageClick(photo)}
        >
          <ImageCard photo={photo} />
        </li>
      ))}
    </ul>
  );
};
