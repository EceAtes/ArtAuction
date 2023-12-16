import Auction from "./Auction";
import styles from "./AuctionList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";

const AuctionList = (props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Auctions</h1>
        <button className={styles.filterButton}>
          <TuneIcon fontSize="medium"></TuneIcon>
        </button>
        <button className={styles.filterButton}>
          <FilterListIcon fontSize="medium"></FilterListIcon>
        </button>
      </div>

      <div className={styles.auctionListContainer}>
        {props.auctions.map((auction) => (
          <Auction
            auctionID={auction.auctionID}
            key={auction.auctionID}
            imageUrl={"/photos/loginpage.png"}
            title={auction.title}
            highlighterAdminID={auction.highlighter_admin_ID}
            //availableExhibitions={auction.availableExhibitions}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
