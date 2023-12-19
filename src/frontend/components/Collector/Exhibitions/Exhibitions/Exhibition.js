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
            key={auction.auctionID}
            auctionID={auction.auctionID}
            imageUrl={"/photos/loginpage.png"}
            auctionName={auction.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Exhibition;
