import styles from "./AuctionList.module.css";
import StarIcon from "@mui/icons-material/Star";
import BlurOnIcon from "@mui/icons-material/BlurOn";

const Auction = (props) => {
  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
        <div className={styles.starsContainer}>
          <button className={styles.auctionFilterButton}>
            <StarIcon fontSize="large"></StarIcon>
          </button>
          <button className={styles.auctionFilterButton}>
            <BlurOnIcon fontSize="large"></BlurOnIcon>
          </button>
        </div>
      </div>
      <h3 className={styles.auctionHeader}>{props.auctionName}</h3>
      <button className={styles.moreButton}>More</button>
    </div>
  );
};

export default Auction;
