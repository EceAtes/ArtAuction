import styles from "@/components/Admin/Proposals/ProposalList/ProposalList.module.css";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import BidHistory from "./AuctionBidHistoryModal";
import { auctionaVerifySaleApiFunction, auctionGetAllBidHistiory } from "@/pages/api/auction";

const ProposedAuction = (props) => {

  const [bidModal, setBidModal]= useState(false);
  const [bids, setBids] = useState([]);

  const viewBids = () => {
    setBidModal(true);
    console.log(props.id);
    auctionGetAllBidHistiory(props.id)
    .then((data) => {
      console.log("Bid Success", data);
      setBids(data); // Use setArtisInfo instead of setArtist
    })
    .catch((error) => {
      console.error("Bid failed", error,);
    });
  };

  const closeBidModal = () => {
    setBidModal(false);
  };

  //IMPORT API FOR POST
function postBidDecision(decision, artistId, auctionId){
  const soldAuction= {
    userRole: "Artist",
    userID: artistId,
    auctionID: auctionId,
    decision: decision
  };
  console.log(soldAuction);
  auctionaVerifySaleApiFunction(soldAuction);
}

const accept =()=>{
    alert('Bid accepted!');
    //api connection - post
    postBidDecision("Accepted", props.artistId, props.id);
}

const reject =()=>{
  alert('Bid rejected!');
  //api connection - post
  console.log(props);
  postBidDecision("Rejected", props.artistId, props.id);
}

  return (
    <div className={styles.proposalContainer}>
      <h3 className={styles.proposalHeader}>{props.title}</h3>

      <div className={styles.detailsContainer}>
        <div className={styles.imageContainer}>
          <img src={props.imageUrl} alt="Auction" />
        </div>
        <div className={styles.informationContainer}>
          <div className={styles.info}>
            <b>Title: </b>
            {props.title}
          </div>
          <div className={styles.info}>
            <b>Type: </b> {props.type}
          </div>
          <div className={styles.info}>
            <b>Size: </b> {props.size}
          </div>
          <div className={styles.info}>
            <b>Creation Date: </b> {props.creationDate}
          </div>
          <div className={styles.info}>
            <b>Auction Proposal Date: </b> {props.auctionProposalDate}
          </div>
          <div className={styles.info}>
            <b>Auction End Date: </b> {props.auctionEndDate}
          </div>
          <div className={styles.info}>
            <b>Starting Bid: </b> {props.startingBid} tokens
          </div>
          <div className={styles.info}>
            <b>Minimum Bid Increase: </b> {props.minimumBidIncrease} tokens
          </div>
          <div>
            <b style={{
                fontWeight: 'bold',
                fontSize: "20px",
                color: 'purple',
                marginTop: '40px',
            }}>Leading Bid: </b> 140 {props.leadingBid} tokens
            <div>
            <Button variant="contained" color="error" onClick={reject}>
                Reject
            </Button>
            <Button variant="contained" color="success" onClick={accept}>
                Accept
            </Button>
            </div>
            
          </div>
        </div>
      </div>
      <div className={styles.auctionDescriptionContainer}>
        <h3 className={styles.auctionDescriptionHeader}>Auction Description</h3>
        <p className={styles.auctionDescription}>{props.description}</p>
      </div>
        <Button
            variant="contained"
            color="secondary"
            onClick={viewBids}
            >
            Bid History
        </Button>

        <Dialog open={bidModal} onClose={closeBidModal}>
        <DialogTitle>Bid History</DialogTitle>
        <DialogContent>
          <BidHistory rows={bids}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeBidModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
};

export default ProposedAuction;