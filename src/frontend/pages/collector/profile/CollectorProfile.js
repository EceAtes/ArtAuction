import React from 'react';
import Navbar from "@/components/Collector/UI/Navbar/Navbar";
import styles from './CollectorProfile.module.css';
import '../styles/global.css';
import profilePicture from '../public/photos/yoongi.jpg';

//where to put this
import OngoingAuctions from './OngoingAuctions';

export default function CollectorProfile(){
    const auctions = [
        {
            id: 1,
            imageUrl: {profilePicture},
            auctionName: "Others Auction-1",
            artworkType: "Oil Painting",
            artworkSize: "70 x 120 cm",
            creationDate: "31.07.2023",
            artworkCreationPlace: "Ankara",
            auctionEndDate: "01.01.2024",
            startingBid: 160,
            leadingBid: 0,
            minimumBidIncrease: 40,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      
        {
            id: 2,
            imageUrl: {profilePicture},
            auctionName: "Others Auction-1",
            artworkType: "Oil Painting",
            artworkSize: "70 x 120 cm",
            creationDate: "31.07.2023",
            artworkCreationPlace: "Ankara",
            auctionEndDate: "01.01.2024",
            startingBid: 160,
            leadingBid: 0,
            minimumBidIncrease: 40,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 3,
            imageUrl: {profilePicture},
            auctionName: "Yoongi Boongi",
            artworkType: "Sculpture",
            artworkSize: "70 x 120 cm",
            creationDate: "31.07.2023",
            artworkCreationPlace: "Ankara",
            auctionEndDate: "01.01.2024",
            startingBid: 160,
            leadingBid: 0,
            minimumBidIncrease: 40,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ];

    return(
        <div className={styles.collectorProfileContainer}>
            <Navbar></Navbar>
            <div className = {styles.contentContainer}>
                <div className={styles.collectorBox}>
                   <img className={styles.profilePicture} src="./yoongi.jpg" alt={`Profile of Lady Gaga`} />
                    <div className={styles.collectorInfo}>
                        <h1> LADY GAGA </h1>
                        <p> She is the icon, she is the legend and she is the moment </p>
                        <button className = {styles.button}>See Followers</button>
                        <button className = {styles.button}>See Following</button>
                    </div>
                </div>
                <div className = {styles.auction}>
                    <OngoingAuctions auctions={auctions} title={"Ongoing Auctions"} ></OngoingAuctions>
                    <OngoingAuctions auctions={auctions} title={"Past Auctions"} ></OngoingAuctions>
                    <OngoingAuctions auctions={auctions} title={"Saved Auctions"} ></OngoingAuctions>
                </div>
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