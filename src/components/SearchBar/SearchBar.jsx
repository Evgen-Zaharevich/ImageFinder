// import { Component } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  MdOutlineImageSearch,
} from './SearchBar.styled';

export const SearchBar = ({ searchQuery }) => {
  const [input, setInput] = useState('');

  const onChange = e => {
    setInput(e.target.value.trim().toLowerCase());
  };

  const onSubmit = e => {
    e.preventDefault();
    searchQuery(input);
    setInput('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton>
          <MdOutlineImageSearch />
        </SearchFormButton>

        <SearchFormInput
          onChange={onChange}
          value={input}
          className="input"
          type="text"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.func.isRequired,
};
