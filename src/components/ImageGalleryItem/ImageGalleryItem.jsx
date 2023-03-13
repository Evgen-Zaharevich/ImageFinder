import { useState } from 'react';
// import { Component } from 'react';
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

// export class ImageGalleryItem extends Component {
//   state = {
//     largeURL: '',
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   clickOnImage = () => {
//     const { largeImageURL } = this.props;

//     this.setState({ largeURL: largeImageURL });
//     this.toggleModal();
//     return;
//   };

//   render() {
//     const { webformatURL, tags } = this.props;
//     const { showModal, largeURL } = this.state;

//     return (
//       <ImageGalleryITEM>
//         <ImageGalleryItemImage
//           src={webformatURL}
//           alt={tags}
//           onClick={this.clickOnImage}
//         />
//         {showModal && (
//           <Modal
//             largeURL={largeURL}
//             tags={tags}
//             toggleModal={this.toggleModal}
//           />
//         )}
//       </ImageGalleryITEM>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   largeURL: PropTypes.string,
// };
