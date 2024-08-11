import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
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
