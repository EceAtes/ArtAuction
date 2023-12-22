'use client'
import styles from "./AuctionInfo.module.css";
import {useRouter} from 'next/navigation';

const AuctionInfo = (props) => {

  const router = useRouter();

  const handleMoreClick = () => {
    console.log(props);
    if (props.auctionID) {
      // Perform navigation or any other action
      console.log(`Navigate to /admin/information/auctioninfo/${props.auctionID}`);
      router.push(`/collector/auction/${props.auctionID}`);
    }
  
  };

  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
      </div>
      <h3 className={styles.auctionHeader}>{props.auctionName}</h3>
      <h4> {props.artworkType}</h4>
      <h4> {props.leadingBid} </h4>
      <button className={styles.moreButton} onClick={handleMoreClick} >More</button>
    </div>
  );
};

export default AuctionInfo;

/*/<h4> {props.minimumBidIncrease} </h4>
<h4> {props.leadingBid} </h4>
<h4> {props.creationDate} </h4>
 */