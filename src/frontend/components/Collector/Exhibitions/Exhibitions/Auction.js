import { useRouter } from "next/router";
import styles from "./Exhibition.module.css";
import Link from "next/link";
const ExhibitionAuction = (props) => {
  const router = useRouter();
  const handleMoreButton = (event) => {
    router.push(`/admin/information/auctioninfo/${props.auctionID}`);
  };
  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
      </div>
      <h3 className={styles.auctionHeader}>{props.auctionName}</h3>

      <button className={styles.moreButton} onClick={handleMoreButton}>
        More
      </button>
    </div>
  );
};

export default ExhibitionAuction;
