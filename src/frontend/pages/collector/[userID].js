import React from "react";
import { useState, useEffect } from "react";
import SearchEntry from "@/components/Collector/UI/SearchEntry/SearchEntry";
import Navbar from "@/components/Collector/UI/Navbar/Navbar";
/*import styles from "../../components/Collector/MainPage/CollectorMainPage.module.css";*/
import styles from "@/components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import {
  auctionGetPopularAuctionsApiFunction,
  auctionGetRecentAuctionsApiFunction,
} from "../api/auction";

import AuctionList from "@/components/Artist/MainPage/Auctions/AuctionList";

import {
  artUserAuctionsFromPeopleApiFunction,
  artUsersGetTopArtistsApiFunction,
  artUsersGetTopCollectorsApiFunction,
} from "../api/artuser";
import PeopleList from "@/components/Artist/MainPage/PeopleList/PeopleList";

export default function CollectorMainPage() {
  const [searchValue, setSearchValue] = useState("");
  const [followedPeopleAuctions, setFollowedPeopleAuctions] = useState([]);
  const [popularAuctions, setPopularAuctions] = useState([]);
  const [recentAuctions, setRecentAuctions] = useState([]);
  const [topCollectors, setTopCollectors] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const userID = parseInt(localStorage.getItem("userID"), 10);

  useEffect(() => {
    artUserAuctionsFromPeopleApiFunction(userID)
      .then((data) => {
        console.log("followed auctions successful ", data);
        setFollowedPeopleAuctions(data);
        return auctionGetPopularAuctionsApiFunction();
      })
      .then((data) => {
        console.log("followed auctions successful ", data);
        setPopularAuctions(data);
        return auctionGetRecentAuctionsApiFunction();
      })
      .then((data) => {
        console.log("Recent Auctions successful ", data);
        setRecentAuctions(data);
        return artUsersGetTopCollectorsApiFunction(); // Call the function
      })
      .then((data) => {
        console.log("Top Collectors success ", data);
        setTopCollectors(data);
        return artUsersGetTopArtistsApiFunction(); // Call the function
      })
      .then((data) => {
        console.log("Top Artists success ", data);
        setTopArtists(data);
      })
      .catch((error) => {
        console.error("failed", error.message);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <main
      style={{
        flex: "1",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchEntry onSearch={handleSearch} />
      </div>

      <div className={styles.container}>
        {followedPeopleAuctions.length > 0 ? (
          <AuctionList
            auctions={followedPeopleAuctions}
            title={"Auctions From People You Follow"}
          />
        ) : (
          <h2>No auctions from followed people</h2>
        )}

        {popularAuctions.length > 0 ? (
          <AuctionList auctions={popularAuctions} title={"Popular Auctions"} />
        ) : (
          <h2>No popular auction</h2>
        )}

        {recentAuctions.length > 0 ? (
          <AuctionList auctions={recentAuctions} title={"Recent Auctions"} />
        ) : (
          <h2>No recent auctions</h2>
        )}
      </div>
      <div>
        {topCollectors.length > 0 ? (
          <PeopleList title="Top Collectors" peopleList={topCollectors} />
        ) : (
          <h2>No collector</h2>
        )}
      </div>
      <div>
        {topArtists.length > 0 ? (
          <PeopleList title="Top Artists" peopleList={topArtists} />
        ) : (
          <h2>No artist</h2>
        )}
      </div>
    </main>
  );
}
