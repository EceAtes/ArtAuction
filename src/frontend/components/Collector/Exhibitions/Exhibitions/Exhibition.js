import ExhibitionAuction from "./Auction";
import styles from "./Exhibition.module.css";

const Exhibition = (props) => {
  return (
    <div className={styles.exhibitionContainer}>
      <div className={styles.exhibitionHeaderContainer}>
        <h3 className={styles.exhibitionHeader}>{props.title}</h3>
      </div>

      <div className={styles.description}>
        <p>{props.description}</p>
      </div>

      <div className={styles.auctionListContainer}>
        {props.auctions.map((auction) => (
          <ExhibitionAuction
            key={auction.id}
            imageUrl={auction.imageUrl}
            auctionName={auction.auctionName}
          />
        ))}
      </div>
    </div>
  );
};

export default Exhibition;
