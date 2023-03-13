import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
// import { Component } from 'react';
import { FetchImages } from 'components/api/FetchImages';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryList, ButtonLoadMore } from './ImageGallery.styled';
import { nanoid } from 'nanoid';

export const ImageGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSearchQueryValue = searchQuery => {
    setSearchQuery(searchQuery);
    setPictures([]);
    setPage(1);
    setError(null);
    setEmpty(false);
    setShowModal(false);
    setLoading(false);
  };

  useEffect(() => {
    getPictures(searchQuery, page);
  }, [searchQuery, page]);

  const getPictures = async (searchQuery, page) => {
    setLoading(true);

    try {
      const { hits } = await FetchImages(searchQuery, page);
      // умова для рендеру меседжу при не вірному запиті в input
      if (hits.length === 0 && pictures.length === 0) {
        setEmpty(true);
      }

      // умова для не рендеру компоненту button load more коли картинки на бекенді закінчилися
      const resultVisionButton = hits.length === 12;

      setPictures(prevState => [...prevState, ...hits]);
      setShowButton(resultVisionButton);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <SearchBar searchQuery={getSearchQueryValue} />
      <ImageGalleryList>
        {pictures.map(({ webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={nanoid()}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
      </ImageGalleryList>
      {showButton && (
        <ButtonLoadMore type="button" onClick={loadMore}>
          Load more
        </ButtonLoadMore>
      )}
      {empty && (
        <p>Sorry. This query "{searchQuery}" is not valid, please try again.</p>
      )}
      {error && <p>Sorry. This {error}. </p>}
      {loading && <Loader />}
    </>
  );
};

// export class ImageGallery extends Component {
//   state = {
//     searchQuery: '',
//     pictures: [],
//     page: 1,
//     error: null,
//     showButton: false,
//     empty: false,
//     showModal: false,
//     loading: false,
//   };

//   getSearchQueryValue = searchQuery => {
//     this.setState({
//       searchQuery: searchQuery,
//       pictures: [],
//       page: 1,
//       error: null,
//       empty: false,
//       showModal: false,
//       loading: false,
//     });
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     const { searchQuery, page } = this.state;

//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getPictures(searchQuery, page);
//     }
//   };

//   getPictures = async (searchQuery, page) => {
//     const { pictures } = this.state;
//     this.setState({ loading: true });
//     try {
//       const { hits } = await FetchImages(searchQuery, page);

//       // умова для рендеру меседжу при не вірному запиті в input
//       if (hits.length === 0 && pictures.length === 0) {
//         this.setState({ empty: true });
//       }

//       // умова для не рендеру компоненту button load more коли картинки на бекенді закінчилися
//       const resultVisionButton = hits.length === 12;

//       this.setState(prevState => ({
//         pictures: [...prevState.pictures, ...hits],
//         showButton: resultVisionButton,
//         loading: false,
//       }));
//     } catch (error) {
//       this.setState({ error: error.message, loading: false });
//     }
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   render() {
//     const { pictures, error, showButton, empty, searchQuery, loading } =
//       this.state;

//     return (
//       <>
//         <SearchBar searchQuery={this.getSearchQueryValue} />
//         <ImageGalleryList>
//           {pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
//             <ImageGalleryItem
//               key={id}
//               webformatURL={webformatURL}
//               largeImageURL={largeImageURL}
//               tags={tags}
//             />
//           ))}
//         </ImageGalleryList>
//         {showButton && (
//           <ButtonLoadMore type="button" onClick={this.loadMore}>
//             Load more
//           </ButtonLoadMore>
//         )}
//         {empty && (
//           <p>
//             Sorry. This query "{searchQuery}" is not valid, please try again.
//           </p>
//         )}
//         {error && <p>Sorry. This {error}. </p>}
//         {loading && <Loader />}
//       </>
//     );
//   }
// }
