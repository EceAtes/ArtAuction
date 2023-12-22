import { useState, useEffect } from "react";
import Navbar from '@/components/Admin/UI/Navbar/Navbar';
import styles from './AuctionInformationPage.module.css';
import '../styles/global.css';
import profilePicture from '../public/yoongi.jpg';
import {useState} from 'react'
import PlaceBidModal from '@/components/Collector/Auctions/placeBidModal';
import BidTable from '@/components/Collector/Auctions/bidTable';
import { useRouter } from "next/router";
import { auctionGetSingleAuctionApiFunction } from "@/pages/api/auction";
import AuctionInfo from "@/components/Admin/Information/AuctionInfo/Auction";

export default function AuctionInformationPage(props){

    const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false);
    const [bid, setBid] = useState([]);
    const [leadingBid, setLeadingBid] = useState(0);
    const [auction, setAuction] = useState(null);
    const router = useRouter();
    const { auctionID } = router.query;

    useEffect(() => {
        //console.log(auctionID);

        if (auctionID) {
        console.log(auctionID);
        auctionGetSingleAuctionApiFunction(auctionID)
            .then((data) => {
            console.log("Auction details successful ", data);
            setAuction(data);
            })
            .catch((error) => {
            console.error("Auction details failed", error);
            });
        }
    }, [auctionID]);
    const handleSubmitBid = (newBid) => {
        // Update the bids array with the new bid
        setBid((prevBids) => [...prevBids, newBid]);
        if (newBid.amount > leadingBid) {
            setLeadingBid(newBid.amount);
        }
    };


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
                    <h2 className={styles.auctionHeader}>{auction.title}</h2>
                    <div className={styles.imageContainer}>
                        <img className= {styles.image} src= "./yoongi.jpg" alt="Auction" />
                        <ul className = {styles.auctionInfoList}>
                            <li> Title: {auction.title} </li>
                            <li> Type:  {auction.type}</li>
                            <li> Size: {auction.size}</li>
                            <li> Creation Date: {auction.creationDate}</li>
                            <li> Creation Place: {auction.artworkCreationPlace}</li>
                            <li> Auction End Date: {auction.endDate}</li>
                        </ul>
                        <label className = {styles.leadingBidLabel}> Leading Bid: {leadingBid}</label>
                        <button className = {styles.button} onClick={handlePlaceBid}> PLACE BID </button>
                        {isPlaceBidModalOpen && (
                        <PlaceBidModal
                            auctionName= {auction.auctionName}
                            endDate={auction.auctionEndDate}
                            startingBid={auctionstartingBid}
                            minimumBidIncrease={auction.minimumBidIncrease}
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
            artistImageUrl={"/photos/signuppage.png"}*/