// import { Component } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
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
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
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

// export class SearchBar extends Component {
//   state = {
//     input: '',
//   };

//   onChange = e => {
//     this.setState({ input: e.target.value.trim().toLowerCase() });
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     this.props.searchQuery(this.state.input);
//     this.setState({ input: '' });
//   };

//   render() {
//     const { input } = this.state;

//     return (
//       <Searchbar>
//         <SearchForm onSubmit={this.onSubmit}>
//           <SearchFormButton>
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             onChange={this.onChange}
//             value={input}
//             className="input"
//             type="text"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </Searchbar>
//     );
//   }
// }

// SearchBar.propTypes = {
//   searchQuery: PropTypes.func.isRequired,
// };
