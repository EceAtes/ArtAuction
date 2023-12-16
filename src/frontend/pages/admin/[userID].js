import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import { useState, useEffect, use } from "react";
import styles from "../../components/Admin/MainPage/AdminMainPage.module.css";
import AuctionList from "@/components/Admin/MainPage/Auctions/AuctionList";
import SearchIcon from "@mui/icons-material/Search";
import PeopleList from "@/components/Admin/MainPage/People/PeopleList";
import { adminHomeApiFunction } from "../api/admin";
const AdminMainPage = (props) => {
  const [search, setSearch] = useState("");
  const [auctionList, setAuctionList] = useState([]);
  const [artUserList, setArtUserList] = useState([]);

  useEffect(() => {
    adminHomeApiFunction()
      .then((data) => {
        console.log("Admin home successful ", data);
        setArtUserList(data.artUsers);
        setAuctionList(data.auctions);
      })
      .catch((error) => {
        console.error("Admin home  failed", error);
      });
  }, []);

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
        {auctionList.length > 0 ? (
          <AuctionList auctions={auctionList} />
        ) : (
          <h2>No auctions available.</h2>
        )}

        {artUserList.length > 0 ? (
          <PeopleList artUsers={artUserList} />
        ) : (
          <h2>No users available.</h2>
        )}
      </div>
    </>
  );
};

export default AdminMainPage;
