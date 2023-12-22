import { useRouter } from "next/router";
import styles from "./AuctionList.module.css";

const Auction = (props) => {
  const router = useRouter();
  const handleMoreButton = (event) => {
    router.push(`/admin/information/auctioninfo/${props.auctionID}`);
    console.log(props);
  };
  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
      </div>
      <h3 className={styles.auctionHeader}>{props.title}</h3>
      <button className={styles.moreButton} onClick={handleMoreButton}>
        More
      </button>
    </div>
  );
};

export default Auction;
