import { useState } from "react";
import styles from "./SearchEntry.module.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchEntry = (props) => {
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    props.onClick(event, search);
  };
  return (
    <div className={styles.container}>
      <p className={styles.searchText}>
        Search to discover auctions, exhibitions, artists or collectors all
        around the world
      </p>
      <div className={styles.search}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.formInput}
            id="text"
            name="text"
            placeholder=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button type="submit" className={styles.searchButton}>
            <SearchIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchEntry;
