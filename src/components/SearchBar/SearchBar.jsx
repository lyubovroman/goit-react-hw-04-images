import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchBarHeader,
  SearchForm,
  SearchInput,
  SearchButton,
  SearchLabel,
} from './SearchBar.styled';

export default function SearchBar({ onSubmit }) {
  const[searchQuery, setSearchQuery] = useState("")
  // state = {
  //   searchQuery: '',
  // };

 const onChange = event => {
   setSearchQuery(event.target.value.toLowerCase());
  };

 const handleSubmit = event => {
    event.preventDefault();
 
     if (searchQuery.trim() === '') {
      toast.info('Please enter details for search');
      return;
   };
  
   
   onSubmit(searchQuery);
   setSearchQuery('');
  }


    return (
      <SearchBarHeader>
        <SearchForm
          onSubmit={handleSubmit}
          
        >
          <SearchButton type="submit" className="button">
            <FcSearch size="24px" />
            <SearchLabel className="button-label">
              Search
            </SearchLabel>
          </SearchButton>
          <ToastContainer/>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChange}
            value={searchQuery}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};