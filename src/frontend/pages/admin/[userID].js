import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import { useState } from "react";
import styles from "../../components/Admin/MainPage/AdminMainPage.module.css";
import AuctionList from "@/components/Admin/MainPage/Auctions/AuctionList";
const AdminMainPage = (props) => {
  const [search, setSearch] = useState("");

  const handleSubmit = async (event) => {
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.formInput}
            id="text"
            name="text"
            placeholder=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </form>
        <AuctionList></AuctionList>
      </div>
    </>
  );
};

export default AdminMainPage;
