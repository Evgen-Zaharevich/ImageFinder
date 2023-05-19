import PropTypes from 'prop-types';
import { useEffect } from 'react';
// import { Component } from 'react';

import { createPortal } from 'react-dom';
import { Overlay, ModalContainer, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeURL, tags, toggleModal }) => {
  const closeModal = ({ code, target, currentTarget }) => {
    if (code === 'Escape') {
      toggleModal();
    }

    if (target === currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalContainer>
        <Image src={largeURL} alt={tags} onClick={toggleModal} />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
