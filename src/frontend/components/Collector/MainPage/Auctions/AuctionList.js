import Auction from "./Auction";
import styles from "./AuctionList.module.css";



const AuctionList = ({ title, auctions }) => {

  const auctionItems = auctions.map((auction) => (
    <Auction
      key={auction.id}
      imageUrl={auction.imageUrl}
      auctionName={auction.auctionName}
    />
  ));

  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.listHeader}>{title}</h1>

        <div className={styles.auctionListContainer}>{auctionItems}</div>
      </div>
    </>
  );
};



export default AuctionList;
