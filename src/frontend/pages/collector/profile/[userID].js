import Navbar from "@/components/Collector/UI/Navbar/Navbar";
import styles from './CollectorProfile.module.css';
//import AuctionInfo from "@/components/Admin/Information/AuctionInfo/Auction";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {collectorGetCollectorInfoApiFunction, collectorGetOngoingAuctionsApiFunction, collectorGetPastAuctionsApiFunction, collectorGetSavedAuctionsApiFunction } from "@/pages/api/collector";
import OngoingAuctions from "./OngoingAuction";
import { artUserAuctionsFromPeopleApiFunction, artUsersGetFollowersApiFunction, artUsersGetTopArtistsApiFunction, artUsersGetTopCollectorsApiFunction } from "@/pages/api/artuser";
import { auctionGetPopularAuctionsApiFunction, auctionGetRecentAuctionsApiFunction } from "@/pages/api/auction";


const CollectorInfo = (props) => {

  const [ongoingAuction,setOngoingAuction] = useState(null);
  const [pastAuction, setPastAuction] = useState(null);
  const [savedAuction, setSavedAuction] = useState(null);
  const [follower, setFollower] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { userID } = router.query;   
  
  /*useEffect(() => {
    adminHomeApiFunction()
      .then((data) => {
        console.log("Admin home successful ", data);
        setArtUserList(data.artUsers);
        setAuctionList(data.auctions);
      })
      .catch((error) => {
        console.error("Admin home  failed", error);
      });
  }, []);*/

  const [followedPeopleAuctions, setFollowedPeopleAuctions] = useState([]);
  const [popularAuctions, setPopularAuctions] = useState([]);
  const [recentAuctions, setRecentAuctions] = useState([]);


  useEffect(() => {
    artUserAuctionsFromPeopleApiFunction(userID)
      .then((data) => {
        console.log("followed auctions successful ", data);
        setFollowedPeopleAuctions(data);
        return auctionGetPopularAuctionsApiFunction();
      })
      .then((data) => {
        console.log("popular auctions successful ", data);
        setPopularAuctions(data);
        return auctionGetRecentAuctionsApiFunction();
      })
      .then((data) => {
        console.log("recent auctions successful ", data);
        // Assuming collectorGetCollectorInfoApiFunction takes a collectorID as an argument
        return collectorGetCollectorInfoApiFunction(userID);
      })
      .then((collectorInfo) => {
        console.log("collector info successful ", collectorInfo);
        // Handle the collectorInfo data as needed
        setUser(collectorInfo);
      })
      .catch((error) => {
        console.error("failed", error.message);
      });
  }, [userID]);


  /*const handleSearch = async (event, search) => {
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
  };*/

  const handleFollowers = async () => {
    console.log("followers");
    artUsersGetFollowersApiFunction(userID)
    .then((data) =>{
      console.log(data);
      setFollower(data);
    })
    .catch((error) =>{
      console.error("failed followers");
    })
  }

  return (
    <>
      <Navbar></Navbar>
      <div className = {styles.contentContainer}>
        <div className={styles.collectorBox}>
          <img className={styles.profilePicture} src="./yoongi.jpg" alt={`Profile of Lady Gaga`} />
          <div className={styles.collectorInfo}>
              <h1> lady gaga </h1>
              <p> She is the icon, she is the legend and she is the moment </p>
              <button className = {styles.button} onClick={handleFollowers}>See Followers</button>
              <button className = {styles.button} >See Following</button>
          </div>
                   
        </div>
        <div className = {styles.auction}>
            {popularAuctions.length > 0 ? (
              <OngoingAuctions auctions={popularAuctions} title={"Ongoing Auctions"} ></OngoingAuctions>
                ) : (
            <h2>No popular auction</h2>
            )}                
          </div>     
      </div>
    </>
  );
};

export default CollectorInfo;
/*

 <div className = {styles.auction}>
                  <OngoingAuctions auctions={ongoingAuction} title={"Ongoing Auctions"} ></OngoingAuctions>
                  <OngoingAuctions auctions={pastAuction} title={"Past Auctions"} ></OngoingAuctions>
                  <OngoingAuctions auctions={savedAuction} title={"Saved Auctions"} ></OngoingAuctions>
              </div>


<div className={styles.container}>
        {auction ? (
          <AuctionInfo
            auctionID={auction.auctionID}
            key={auction.auctionID}
            title={auction.title}
            imageUrl={"/photos/loginpage.png"}
            type={auction.type}
            size={auction.size}
            creationDate={auction.creationDate}
            auctionEndDate={auction.endDate}
            baseBid={auction.baseBid}
            minimumBidIncrease={auction.minimumBidIncrease}
            description={auction.description}
            artistId={auction.uploaded_by_artist_ID}
            artistName={auction.artistName}
            artistImageUrl={"/photos/signuppage.png"}
          ></AuctionInfo>
        ) : (
          <h2 className={styles.heading}>No Auction</h2>
        )}
      </div>
 */