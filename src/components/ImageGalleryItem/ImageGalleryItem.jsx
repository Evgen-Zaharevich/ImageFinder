import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryITEM,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [largeURL, setLargeURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(pervState => !pervState);
  };

  const clickOnImage = () => {
    setLargeURL(largeImageURL);
    toggleModal();
    return;
  };

  return (
    <ImageGalleryITEM>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={clickOnImage}
      />
      {showModal && (
        <Modal largeURL={largeURL} tags={tags} toggleModal={toggleModal} />
      )}
    </ImageGalleryITEM>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
};
