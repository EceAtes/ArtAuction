import { useState, useEffect } from "react";
import Navbar from '@/components/Collector/UI/Navbar/Navbar';
import styles from './AuctionInformationPage.module.css';
import PlaceBidModal from '@/components/Collector/Auctions/placeBidModal';
import BidTable from '@/components/Collector/Auctions/bidTable';
import { useRouter } from "next/router";
import { auctionGetSingleAuctionApiFunction } from "@/pages/api/auction";
import AuctionInfo from "@/components/Admin/Information/AuctionInfo/Auction";
import { collectorBidApiFunction, collectorBidHistoryApiFunction } from "@/pages/api/collector";

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

    const handleSubmitBid = async (newBid) => {
        try {
            const collectorID = parseInt(localStorage.getItem('userID'), 10);
            const auctionID = parseInt(router.query.auctionID); 
            const bidAmount = parseInt(newBid.amount);
          
            if (isNaN(collectorID)) {
                console.log('User ID not found in local storage');
                return;
            }
    
            const response = await collectorBidApiFunction(collectorID, auctionID, bidAmount);
            console.log('Bid placed successfully:', response);
    
            // Update state if needed
            //setBid((prevBids) => [...prevBids, newBid]);
            if (newBid.amount > leadingBid) {
                setLeadingBid(newBid.amount);
            }
                // Update bid history after placing the bid
            await collectorBidHistoryApiFunction(collectorID, auctionID);
            console.log('Collector bid history updated successfully');

        } catch (error) {
            console.error('Failed to place bid:', error.message);
            // Handle error as needed
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
            {auction ? (
                    <div className = {styles.contentContainer}>
                    <div className={styles.auctionContainer}>
                        <h2 className={styles.auctionHeader}>{auction.title}</h2>
                        <div className={styles.imageContainer}>
                            <img className= {styles.image} src= "/photos/loginpage.png" alt="Auction" />
                            <ul className = {styles.auctionInfoList}>
                                <li> Title: {auction.title} </li>
                                <li> Type:  {auction.type}</li>
                                <li> Size: {auction.size}</li>
                                <li> Creation Date: {auction.creationDate}</li>
                                <li> Auction End Date: {auction.endDate}</li>
                            </ul>
                            <label className = {styles.leadingBidLabel}> Leading Bid: {leadingBid}</label>
                            <button className = {styles.button} onClick={handlePlaceBid}> PLACE BID </button>
                            {isPlaceBidModalOpen && (
                            <PlaceBidModal
                                auctionName= {auction.title}
                                endDate={auction.endDate}
                                startingBid={auction.baseBid}
                                minimumBidIncrease={auction.minimumBidIncrease}
                                leadingBid={Number (leadingBid)}
                                onSubmitBid={handleSubmitBid}
                                onClose={() => setIsPlaceBidModalOpen(false)} // Close the modal when needed
                            />)}
                        </div>
                        <p> {auction.description}</p>
                    </div>
                    <BidTable bids={bid} ></BidTable>
                </div>
                ) : (
                    <h2 className={styles.heading}>No Auction</h2>
            )}
            
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