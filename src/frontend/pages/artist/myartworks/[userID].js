import React, { useState, useEffect } from "react";
import Navbar from "@/components/Artist/UI/Navbar";
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import ViewMyAuctions from "@/components/Artist/AuctionForms/ViewAuctions";
import { useRouter } from "next/router";
import {
  artistGetEndedAuctionsApiFunction,
  artistGetNotApprovedAuctionsApiFunction,
  artistGetOngoingAuctionsApiFunction,
  artistGetPastAuctionsApiFunction,
} from "@/pages/api/artist";

const ArtistMyArtworksPage = (props) => {
  const router = useRouter();
  const [endedAuctions, setEndedAuctions] = useState([]);
  const [ongoingAuctions, setOngoingAuctions] = useState([]);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [notApprovedAuctions, setNotApprovedAuctions] = useState([]);

  const { userID } = router.query;

  useEffect(() => {
    if (userID) {
      console.log(userID);
      artistGetEndedAuctionsApiFunction(userID)
        .then((data) => {
          console.log("ended auctions successful ", data);
          setEndedAuctions(data);
          return artistGetOngoingAuctionsApiFunction(userID);
        })
        .then((data) => {
          console.log("ongoing auctions successful ", data);
          setOngoingAuctions(data);
          return artistGetPastAuctionsApiFunction(userID);
        })
        .then((data) => {
          console.log("sold Auctions successful ", data);
          setPastAuctions(data);
          return artistGetNotApprovedAuctionsApiFunction(userID);
        })
        .then((data) => {
          console.log("sold Auctions successful ", data);
          setNotApprovedAuctions(data);
        })
        .catch((error) => {
          console.error("failed", error.message);
        });
    }
  }, [userID]);

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
        <ViewMyAuctions
          endedAuctions={endedAuctions}
          ongoingAuctions={ongoingAuctions}
          pastAuctions={pastAuctions}
          notApprovedAuctions= {notApprovedAuctions}
        />
      </div>
    </div>
  );
};

export default ArtistMyArtworksPage;
