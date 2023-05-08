import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AppContainer } from "./App.styled";
import SearchBar  from 'components/SearchBar/SearchBar';

import { ImageGallery } from 'components/ImageGallery/ImageGallery'
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import LoadMoreButton  from "components/Button/Button";

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '34196902-9a76ee909655beae22d37d39f';
const OPTIONS_FOR_RESPONSE = 'image_type=photo&orientation=horizontal';

export default function App(){
 const [searchQuery, setSearchQuery] = useState('');

  const [hits, setHits] = useState([]);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [showButton, setShowButton] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [largeImage, setLargeImage] = useState('');

   useEffect(() => {
    if (!searchQuery) {
      return;
    }

    try {
      const getFetchImages = async () => {
        const {
          data: { hits, totalHits },
        } = await axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${MY_KEY}&${OPTIONS_FOR_RESPONSE}&per_page=12`
  );
        const filteredData = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        if (!filteredData.length) {
          setShowButton(false);
          setIsLoading(false);
         toast.error('There is no  images');
          return;
        }

        const isLastPage = Math.ceil(totalHits / 12) !== page;
        setShowButton(isLastPage);

        setHits(prevHits => [...prevHits, ...filteredData]);
        setIsLoading(false);
      };
      getFetchImages();
    } catch (event) {
      console.log(event);
    }
  }, [page, searchQuery]);

  const onLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const onHandleSubmit = searchQuery => {
   setSearchQuery(searchQuery.toLowerCase().trim() )
  }

  const onShowModal = image => {
    setLargeImage(image);
    setShowModal(true);
    
  };

  const onCloseModal = () => {
    setLargeImage('');
    setShowModal(false);
  };


    return (
      <AppContainer>
        <SearchBar onSubmit={onHandleSubmit} />
        <ToastContainer />
        <ImageGallery hits={hits} showModal={onShowModal} />
        {isLoading && <Loader />}
        {showButton && <LoadMoreButton onClick={onLoadMore} />}
        {showModal && (
          <Modal closeModal={onCloseModal} largeImage={largeImage} />
        )}
      </AppContainer>
    );
  }
