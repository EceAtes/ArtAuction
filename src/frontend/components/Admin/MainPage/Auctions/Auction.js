import styles from "./AuctionList.module.css";

const Auction = (props) => {
  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
      </div>
      <h3 className={styles.auctionHeader}>{props.auctionName}</h3>
      <button className={styles.moreButton}>More</button>
    </div>
  );
};

export default Auction;
