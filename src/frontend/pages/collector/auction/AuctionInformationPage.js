import React, { startTransition } from 'react';
import Navbar from '@/components/Admin/UI/Navbar/Navbar';
import styles from './AuctionInformationPage.module.css';
import '../styles/global.css';
import profilePicture from '../public/yoongi.jpg';
import {useState} from 'react'
import PlaceBidModal from '@/components/Collector/Auctions/placeBidModal';
import BidTable from '@/components/Collector/Auctions/bidTable';

export default function AuctionInformationPage(){
    const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false);
    const [bid, setBid] = useState([]);
    const [leadingBid, setLeadingBid] = useState(0);

    const handleSubmitBid = (newBid) => {
        // Update the bids array with the new bid
        setBid((prevBids) => [...prevBids, newBid]);
        if (newBid.amount > leadingBid) {
            setLeadingBid(newBid.amount);
        }
    };
    const auctions = [
        {
          id: 1,
          imageUrl: "/yoongi.jpg",
          auctionName: "Others Auction-1",
          artworkType: "Oil Painting",
          artworkSize: "70 x 120 cm",
          creationDate: "31.07.2023",
          artworkCreationPlace: "Ankara",
          auctionEndDate: "01.01.2024",
          startingBid: 160,
          leadingBid: 0,
          minimumBidIncrease: 40,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
        },
    ];

    const bids = [
        {
            id: 1,
            status: "leading",
            amount: 200,
            timePlaced: "13.12.2023"
        },
        {
            id: 2,
            status: "outbid",
            amount: 160,
            timePlaced: "13.12.2023"
        },
        {
            id: 3,
            status: "outbid",
            amount: 120,
            timePlaced: "13.12.2023"
        }
    ];

    const handlePlaceBid = () =>{
        setIsPlaceBidModalOpen(true);
    }
    return(
        <div className={styles.collectorProfileContainer}>
            <Navbar></Navbar>
            <div className={styles.collectorBox}>
                <img className={styles.profilePicture} src="./yoongi.jpg" alt={`Profile of Lady Gaga`} />
                <div className={styles.collectorInfo}>
                    <h1> LADY GAGA </h1>
                    <p> She is the icon, she is the legend and she is the moment </p>
                    <button className = {styles.button}>See Followers</button>
                    <button className = {styles.button}>See Following</button>
                </div>
            </div>
            <div className = {styles.contentContainer}>

                <div className={styles.auctionContainer}>
                    <h2 className={styles.auctionHeader}>Yoongi Boongi</h2>
                    <div className={styles.imageContainer}>
                        <img className= {styles.image} src= "./yoongi.jpg" alt="Auction" />
                        <ul className = {styles.auctionInfoList}>
                            <li> Title: {auctions[0].auctionName} </li>
                            <li> Type:  {auctions[0].artworkType}</li>
                            <li> Size: {auctions[0].artworkSize}</li>
                            <li> Creation Date: {auctions[0].creationDate}</li>
                            <li> Creation Place: {auctions[0].artworkCreationPlace}</li>
                            <li> Auction End Date: {auctions[0].auctionEndDate}</li>
                        </ul>
                        <label className = {styles.leadingBidLabel}> Leading Bid: {leadingBid}</label>
                        <button className = {styles.button} onClick={handlePlaceBid}> PLACE BID </button>
                        {isPlaceBidModalOpen && (
                        <PlaceBidModal
                            auctionName= {auctions[0].auctionName}
                            endDate={auctions[0].auctionEndDate}
                            startingBid={auctions[0].startingBid}
                            minimumBidIncrease={auctions[0].minimumBidIncrease}
                            leadingBid={Number (leadingBid)}
                            onSubmitBid={handleSubmitBid}
                            onClose={() => setIsPlaceBidModalOpen(false)} // Close the modal when needed
                        />)}
                    </div>
                    <p> {auctions[0].description}</p>
                </div>
                <BidTable bids={bid} ></BidTable>
            </div>
        </div>
    );
}

/*
            <Navbar/>

                <div className = {styles.auction}>
                    <OngoingAuctions auctions={auctions} title={"Ongoing Auctions"} ></OngoingAuctions>
                    <OngoingAuctions auctions = {auctions} title = {"Past Auctions"}> </OngoingAuctions>
                </div>


export default function CollectorProfile({ name, description }){
    return(
        <div className={styles.collectorProfileContainer}>
            <Navbar/>
            <div className = {styles.contentContainer}>
                <div className={styles.collectorBox}>
                    <img className={styles.profilePicture} src={profilePicture} alt={`Profile of ${name}`} />
                    <div className={styles.collectorInfo}>
                        <p> {description} </p>
                    </div>
                </div>
                <h1> ASLKDGJ </h1>
            </div>
        </div>
    );
}*/

/*
THIS IS THE PAGE AFTER CLICKING MORE 
                <div className={styles.auctionContainer}>
                    <h2 className={styles.auctionHeader}>Yoongi Boongi</h2>
                    <div className={styles.imageContainer}>
                        <img className= {styles.image} src= "./yoongi.jpg" alt="Auction" />
                        <ul>
                            <li> Title: Yoongi Boongi </li>
                            <li> Type: Oil Painting </li>
                            <li> Size: 70 x 120 cm</li>
                            <li> Creation Date: 10.10.2023</li>
                            <li> Creation Place: Ankara</li>
                            <li> Auction End Date: 01.01.2024</li>
                        </ul>
                    </div>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                </div>
    CSS FILE
    /* Auction */
/*.auctionContainer {
    color: #484848;
    width: 60%;
    height: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5%;
    margin: 5px;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.5);
  }
  .auctionHeader {
    font-size: 1rem;
    margin-top: 10px;
    color: #e95793;
    text-align: left;
  }
  
  .imageContainer {
    display: flex;
    
    
  }
  .image{
    max-width: 100%;
    height: 200px;
    border-radius: 5%;
  }
 */