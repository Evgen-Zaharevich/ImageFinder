import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState(false);

  const getSearchQueryValue = searchQuery => {
    setSearchQuery(searchQuery);
    setPictures([]);
    setPage(1);
    setError(null);
    setEmpty(false);
    setLoading(false);
  };

  useEffect(() => {
    // умова щоб при першому рендері на головній сторінці не рендерилися картинки, а тільки після першого запиту у пошуку

    // if (searchQuery === '') {
    //   return
    // }

    const getPictures = async () => {
      setLoading(true);

      try {
        const { hits } = await FetchImages(searchQuery, page);

        // умова для рендеру меседжу при не вірному запиті в input
        if (hits.length === 0) {
          setEmpty(true);
        }

        // умова щоб кнопка <loadMore> не рендерилися якщо з бекенду більше не приходять картинки
        setShowButton(hits.length === 12);

        setPictures(prevState => [...prevState, ...hits]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getPictures();
  }, [searchQuery, page]);

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