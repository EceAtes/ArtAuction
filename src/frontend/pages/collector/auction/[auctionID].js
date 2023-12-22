import { useState, useEffect } from "react";
import Navbar from '@/components/Collector/UI/Navbar/Navbar';
import styles from './AuctionInformationPage.module.css';
import PlaceBidModal from '@/components/Collector/Auctions/placeBidModal';
import BidTable from '@/components/Collector/Auctions/bidTable';
import { useRouter } from "next/router";
import { auctionGetAllBidHistiory, auctionGetSingleAuctionApiFunction } from "@/pages/api/auction";
import AuctionInfo from "@/components/Admin/Information/AuctionInfo/Auction";
import { collectorBidApiFunction, collectorBidHistoryApiFunction,  collectorGetCollectorInfoApiFunction,
} from "@/pages/api/collector";

export default function AuctionInformationPage(props){

    const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false);
    const [bid, setBid] = useState([]);
    const [auction, setAuction] = useState(null);
    const [leadingBid, setLeadingBid] = useState(0);
    const router = useRouter();
    const [user, setUser] = useState([]);

    const { auctionID } = router.query;
 
    
    useEffect(() => {
        //console.log(auctionID);
        const collectorID = parseInt(localStorage.getItem('userID'), 10);
        const fetchData = async () => {
            try {
                if (auctionID) {
                    console.log(auctionID);
    
                    // Fetch auction details
                    const auctionData = await auctionGetSingleAuctionApiFunction(auctionID);
                    console.log("Auction details successful", auctionData);
                    setAuction(auctionData);
    
                    // Update collector bid history
                    /*uctionGetAllBidHistiory(props.id)
                    .then((data) => {
                    console.log("Bid Success", data);
                    setBid(data); // Use setArtisInfo instead of setArtist
                    })
                    .catch((error) => {
                    console.error("Bid failed", error,);
                    });*/
                    await auctionGetAllBidHistiory(auctionID)
                    .then((data) => {
                        console.log(data);
                        setBid(data);
                    })
                    .catch((error) => {
                        console.error("failed followers");
                    });
                    console.log('Collector bid history updated successfully');
                        }
                    } catch (error) {
                        console.error("Error fetching auction details", error);
                    }
        };
    
        fetchData();
        const userID = localStorage.getItem("userID");
        collectorGetCollectorInfoApiFunction(userID).then((collectorInfo) => {
            console.log("collector info successful ", collectorInfo);
            // Handle the collectorInfo data as needed
            setUser(collectorInfo);
          });
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
            await auctionGetAllBidHistiory(auctionID)
            .then((data) => {
                console.log(data);
                setBid(data);
              })
              .catch((error) => {
                console.error("failed followers");
              });
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
                <img className={styles.profilePicture} src="/photos/signuppage.png" alt={`Profile of Lady Gaga`} />
                <div className={styles.collectorInfo}>
                {user[0] ? <h1>{user[0].name}</h1> : <h1>no name</h1>}
            {user[0] ? <p>{user[0].bio}</p> : <p>no name</p>}
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
                            <label className = {styles.leadingBidLabel}> Leading Bid: {bid[0] ?bid[0].bidAmount : <></> }</label>
                            <button className = {styles.button} onClick={handlePlaceBid}> PLACE BID </button>
                            {isPlaceBidModalOpen && (
                            <PlaceBidModal
                                auctionName= {auction.title}
                                endDate={auction.endDate}
                                startingBid={auction.baseBid}
                                minimumBidIncrease={auction.minimumBidIncrease}
                                leadingBid={Number (bid[0].bidAmount)}
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