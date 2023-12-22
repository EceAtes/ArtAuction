import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import { useState, useEffect, use } from "react";
import styles from "../../components/Admin/MainPage/AdminMainPage.module.css";
import AuctionList from "@/components/Admin/MainPage/Auctions/AuctionList";
import PeopleList from "@/components/Admin/MainPage/People/PeopleList";
import { adminHomeApiFunction } from "../api/admin";
import { artUserSearchApiFunction } from "../api/artuser";
import SearchEntry from "@/components/Admin/MainPage/SearchEntry/SearchEntry";
import SearchResult from "@/components/Admin/MainPage/SearchEntry/SearchResults";

const AdminMainPage = (props) => {
  const [searchResult, setSearchResult] = useState(null);
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

  const handleSearch = async (event, search) => {
    event.preventDefault();
    console.log(search);
    artUserSearchApiFunction(search)
      .then((data) => {
        console.log("Admin search successful ", data);
        setSearchResult(data);
      })
      .catch((error) => {
        console.error("Admin search failed", error);
      });
  };

  const handeCloseSearch = async (event) => {
    event.preventDefault();
    setSearchResult(null);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <SearchEntry onClick={handleSearch}></SearchEntry>
        {searchResult != null && (
          <SearchResult
            searchResult={searchResult}
            closeModal={handeCloseSearch}
          ></SearchResult>
        )}
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
