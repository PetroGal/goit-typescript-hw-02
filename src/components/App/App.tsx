import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { getPhotos } from '../../images-api';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { ImageModal } from '../ImageModal/ImageModal';
import { Image } from '../../types';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    const getImages = async () => {
      try {
        const { results, total } = await getPhotos(query, page);
        setImages(prevImages =>
          page === 1 ? results : [...prevImages, ...results]
        );
        setTotal(total);
        setError(null);
      } catch (error) {
        setError('Oops! There was an error, please try again!');
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleSubmit = async (text: string) => {
    setQuery(text);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  const openModal = (photo: Image) => {
    setSelectedImage(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery photos={images} onImageClick={openModal} />
          {images.length > 0 && images.length < total && (
            <LoadMoreBtn onClick={handleClick}>Load More</LoadMoreBtn>
          )}
        </>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        photo={selectedImage}
      />
    </div>
  );
}
