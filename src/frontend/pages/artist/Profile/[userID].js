import React from 'react';
import Auction from '@/components/Artist/AuctionForms/Auction';
import Profile from "@/components/Artist/Profile/Profile"
import Navbar from '@/components/Artist/UI/Navbar';
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import AuctionProposeList from '@/components/Artist/Profile/AuctionList';
import { artistGetArtistInfoApiFunction } from '@/pages/api/artist';
import { auctionGetAllBidHistiory } from '@/pages/api/auction';

import { useEffect, useState } from 'react';
/*const auctions= [
  {
    id: 1,
    title: "Ended Auction 1",
    imageURL: "@/public/photos/loginpage.png",
    type: "Painting",
    size: "200x200",
    auctionProposalDate:"01-12-2023",
    auctionEndDate: "10-01-2024",
    startingBid: "200$",
    minimumBidIncrease: "30$",
    description:"This is a test 1",
    bids:[{status: "Pending", amount: 100, timePlace: "03-12-2023"}, {status: "Rejected", amount: 100, timePlace: "03-12-2023"}]
  },
  {
    id: 2,
    title: "Ended Auction 2",
    imageURL: "@/public/photos/loginpage.png",
    type: "Painting",
    size: "200x200",
    auctionProposalDate:"01-12-2023",
    auctionEndDate: "10-01-2024",
    startingBid: "200$",
    minimumBidIncrease: "30$",
    description:"This is a test 2",
    bids:[{status: "Pending", amount: 90, timePlace: "03-12-2023"}, {status: "Rejected", amount: 80, timePlace: "03-12-2023"}]
  },
  {
    id: 3,
    title: "Ended Auction 3",
    imageURL: "@/public/photos/loginpage.png",
    type: "Painting",
    size: "200x200",
    auctionProposalDate:"01-12-2023",
    auctionEndDate: "10-01-2024",
    startingBid: "200$",
    minimumBidIncrease: "30$",
    description:"This is a test 3",
    bids:[{status: "Pending", amount: 80, timePlace: "03-12-2023"}, {status: "Rejected", amount: 90, timePlace: "03-12-2023"}]
  }
];

const profile ={
    imageURL: "@/public/photos/profile.png",
    artistName: "Vincent Van Gogh",
    mail: "gogh@gmail.com",
    token:500,
    bio:"Hello I am Van Gogh",
    followers: [{id: 1, username: "Cezanne"}, {id:2, username:"Picasso"}],
    follows: [{id: 1, username: "Bansky"}, {id:2, username:"Michalengelo"}, {id:2, username:"DaVinci"}],
    artistID: 1
};*/

const AuctionView = () => {
const [artisInfo, setArtist] = useState([]);

useEffect(() => {
  const artistID = parseInt(localStorage.getItem("userID"), 10);
  console.log(artistID);

  artistGetArtistInfoApiFunction(artistID)
    .then((data) => {
      console.log("Artist Info Success", data);
      setArtist(data); // Use setArtisInfo instead of setArtist
    })
    .catch((error) => {
      console.error("Admin Info failed", error);
    });
}, []); // Use [artisInfo] if you want to run the effect when artisInfo changes


  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: '0 0 20%', padding: '20px', borderRight: '1px solid #ccc' }}>
             {artisInfo.length > 0 ? ( <Profile info={artisInfo[0]}/>) : (<h1>no profile</h1>) }
            </div>
            <div style={{ flex: '1', padding: '20px' }}>
              <AuctionProposeList auctions={artisInfo}/>
            </div>
          </div>
      </div>
      
    </div>
  );
};

export default AuctionView;