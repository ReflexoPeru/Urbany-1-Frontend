import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import styles from './SearchBar.module.css';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={styles['search-container']}>
      <MagnifyingGlass size={20} className={styles['search-icon']} />
      <input
        type="text"
        placeholder="Buscar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles['search-input']}
      />
    </div>
  );
};