import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onRequestClose, photo }) {
  if (!photo) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img
        src={photo.urls.regular}
        alt={photo.alt_description}
        className={css.image}
      />
      <button onClick={onRequestClose} className={css.closeButton}>
        Close
      </button>
    </Modal>
  );
}
