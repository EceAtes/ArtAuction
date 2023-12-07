import styles from "./ProposalList.module.css";
const Proposal = (props) => {
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
            <b>Creation Place: </b> {props.creationPlace}
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
        </div>
        <div className={styles.artistAndButtonsContainer}>
          <h4 className={styles.artistHeader}>BY ARTIST</h4>
          <div className={styles.artistImageContainer}>
            <img src={props.artistImageUrl} alt="Artist" />
            <div className={styles.artistNameAndLinkContainer}>
              <b>{props.artistName}</b>
              <a>SEE PROFILE</a>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button className={styles.approveButton}>Approve</button>
            <button className={styles.rejectButton}>Reject</button>
          </div>
        </div>
      </div>
      <div className={styles.auctionDescriptionContainer}>
        <h3 className={styles.auctionDescriptionHeader}>Auction Description</h3>
        <p className={styles.auctionDescription}>{props.description}</p>
      </div>
    </div>
  );
};

export default Proposal;
