import { Component } from 'react';
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

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  onChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  onSubmit(event) {
    event.preventDefault();
 setTimeout(() => {
     if (this.state.searchQuery.trim() === '') {
      toast.info('Please enter details for search');
      return;
    }
  }, 500);
   

    this.props.onSubmit(this.state.searchQuery.trim());
  }

  render() {
    return (
      <SearchBarHeader>
        <SearchForm
          onSubmit={event => {
            this.onSubmit(event);
          }}
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
            onChange={this.onChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};