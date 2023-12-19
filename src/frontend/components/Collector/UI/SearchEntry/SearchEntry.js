'use client'
import React, { useState } from 'react';
import styles from './SearchEntry.module.css';

const SearchEntry = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    // Call the onSearch function with the current search value
    onSearch(value);
  };

  return (
    <div className={styles.searchEntryContainer}>
      <div className={styles.searchEntry}>
        <p className={styles.searchText}>
          🔍 Search to discover auctions, exhibitions, artists, and collectors all around the world
        </p>
        <input
          className={styles.searchEntryPlace}
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchEntry;
