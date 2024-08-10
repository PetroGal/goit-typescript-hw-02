import { useState } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter text to search for images.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <div className={css.searchBarContainer}>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={handleInputChange}
          value={query}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
