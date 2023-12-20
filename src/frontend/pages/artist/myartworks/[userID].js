import React, { useState, useEffect } from "react";
import Navbar from "@/components/Artist/UI/Navbar";
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import ViewMyAuctions from "@/components/Artist/AuctionForms/ViewAuctions";
import { useRouter } from "next/router";
import { artistGetArtistInfoApiFunction, artistGetEndedAuctionsApiFunction } from "@/pages/api/artist";
import {
  auctionGetOngoingAuctionsApiFunction,
  auctionGetPastAuctionsApiFunction,
} from "@/pages/api/auction";

const ArtistMyArtworksPage = (props) => {
  const router = useRouter();
  const [endedAuctions, setEndedAuctions] = useState([]);
  const [ongoingAuctions, setOngoingAuctions] = useState([]);
  const [soldAuctions, setSoldAuctions] = useState([]);
  const { userID } = router.query;

  useEffect(() => {
    if (userID) {
      console.log(userID);
      artistGetArtistInfoApiFunction(userID)
        .then((data) => {
          console.log("ended auctions successful ", data);
          setEndedAuctions(data);
          return auctionGetOngoingAuctionsApiFunction(userID);
        })
        .then((data) => {
          console.log("ongoing auctions successful ", data);
          setOngoingAuctions(data);
          return auctionGetPastAuctionsApiFunction(userID);
        })
        .then((data) => {
          console.log("sold Auctions successful ", data);
          setSoldAuctions(data);
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
          soldAuctions={soldAuctions}
        />
      </div>
    </div>
  );
};

export default ArtistMyArtworksPage;
