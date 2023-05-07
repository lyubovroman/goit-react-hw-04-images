import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { ModalOverlay, ModalWindow } from './Modal.styled';

export default function Modal({ closeModal, largeImage }) {
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const modalRoot = document.querySelector('#modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ModalWindow>
        <img src={largeImage} alt="tag" />
      </ModalWindow>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};