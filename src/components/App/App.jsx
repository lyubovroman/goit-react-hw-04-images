import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AppContainer } from "./App.styled";
import { SearchBar } from 'components/SearchBar/SearchBar';

import { ImageGallery } from 'components/ImageGallery/ImageGallery'
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import LoadMoreButton  from "components/Button/Button";

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '34196902-9a76ee909655beae22d37d39f';
const OPTIONS_FOR_RESPONSE = 'image_type=photo&orientation=horizontal';

export class App extends Component {
  state = {
    searchQuery: '',
    hits: null,
    page: 1,
    isLoading: false,
    buttonLoading: false,
    showButton: false,
    showModal: false,
    largeImage: '',
  };

 async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
   const nextSearchQuery = this.state.searchQuery;
   
    const prevPage = prevState.page;
   const nextPage = this.state.page;
   
       if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevSearchQuery !== nextSearchQuery ) {
      try {
        this.setState({ hits: null, page: 1, isLoading: true });
        const response = await axios.get(
          `${BASE_URL}?q=${nextSearchQuery}&page=1&key=${MY_KEY}&${OPTIONS_FOR_RESPONSE}&per_page=12`
        );

        const responseHits = response.data.hits;
        const filteredData = responseHits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
            
          })
        );
        if (filteredData.length === 0) {
          toast.error('There is no  images');
          this.setState({
            isLoading: false,
            hits: filteredData,
            showButton: false,
            buttonLoading: false,
          });
          
          return;
        }

        if (filteredData.length < 12) {
          this.setState({
            hits: filteredData,
            isLoading: false,
            showButton: false,
            buttonLoading: false,
          });
          return;
        }

        this.setState({
          hits: filteredData,
          isLoading: false,
          showButton: true,
          buttonLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (prevPage !== nextPage) {
      try {
        if (nextPage === 1) {
          return;
        }
        this.setState({ buttonLoading: true });
        const response = await axios.get(
          `${BASE_URL}?q=${nextSearchQuery}&page=${nextPage}&key=${MY_KEY}&${OPTIONS_FOR_RESPONSE}&per_page=12`
        );
        const responseHits = response.data.hits;
        const filteredData = responseHits.map(
          ({ id, largeImageURL, webformatURL }) => ({
            id,
            largeImageURL,
            webformatURL,
          })
        );
        const newHits = [...this.state.hits, ...filteredData];

        if (filteredData.length < 12) {
          this.setState({
            hits: newHits,
            showButton: false,
            isLoading: false,
          });
          return;
        }
        this.setState({
          hits: newHits,
          isLoading: false,
          showButton: true,
          buttonLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  onLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  handleSubmit(searchQuery) {
    this.setState({ searchQuery: searchQuery.toLowerCase().trim() });
  }

  showModal = image => {
    this.setState({ largeImage: image, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImage: '', showModal: false });
  };

  render() {
    const { hits, isLoading,  showModal, largeImage, showButton } = this.state;
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handleSubmit.bind(this)} />
        <ToastContainer />
        <ImageGallery hits={hits} showModal={this.showModal} />
        {isLoading && <Loader />}
        {showButton && <LoadMoreButton onClick={this.onLoadMore} />}
        {showModal && (
          <Modal closeModal={this.closeModal} largeImage={largeImage} />
        )}
      </AppContainer>
    );
  }
}