import Link from "next/link";
import styles from "./Exhibition.module.css";
const ExhibitionAuction = (props) => {
  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
      </div>
      <h3 className={styles.auctionHeader}>{props.auctionName}</h3>
      <Link
        href={`/admin/information/auctioninfo/${props.auctionID}`}
        passHref
        legacyBehavior
      >
        <button className={styles.moreButton}>More</button>
      </Link>
    </div>
  );
};

export default ExhibitionAuction;
