import styles from "@/components/Admin/Proposals/ProposalList/ProposalList.module.css";
import { Button } from "@mui/material";
const viewBids =()=>{

}
const approveBid =()=>{

}
/*
BOUGHT BY vs. EDIT/DELETE ICONS
LEADING BID VE BID HISTORY HEP GÖZÜKSÜN
*/
const ProposedAuction = (props) => {
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
            }}>Leading Bid: </b> {props.leadingBid} tokens
            <div>
            <Button variant="contained" color="error" onClick={approveBid}>
                Reject
            </Button>
            <Button variant="contained" color="success" onClick={approveBid}>
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
    </div>
  );
};

export default ProposedAuction;