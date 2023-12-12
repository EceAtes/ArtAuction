import React from 'react';
import styles from './SearchEntry.module.css';

const SearchEntry = () => {
  return (
    <div className= {styles.searchEntryContainer}>
      <div className={styles.searchEntry}>
        <p className={styles.searchText}>
          🔍 Search to discover auctions, exhibitions, artists, and collectors all around the world
        </p>
        <input className = {styles.searchEntryPlace} input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default SearchEntry;