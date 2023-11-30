import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import { useState } from "react";
import styles from "../../components/Admin/MainPage/AdminMainPage.module.css";
import AuctionList from "@/components/Admin/MainPage/Auctions/AuctionList";
import SearchIcon from "@mui/icons-material/Search";
import PeopleList from "@/components/Admin/MainPage/People/PeopleList";
const AdminMainPage = (props) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    //api
  };
  return (
    <>
      <Navbar></Navbar>
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
        <AuctionList></AuctionList>

        <PeopleList></PeopleList>
      </div>
    </>
  );
};

export default AdminMainPage;
