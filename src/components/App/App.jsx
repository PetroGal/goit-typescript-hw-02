import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import { getPhotos } from '../../images-api.js';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = async text => {
    setQuery(text);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  const openModal = photo => {
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
