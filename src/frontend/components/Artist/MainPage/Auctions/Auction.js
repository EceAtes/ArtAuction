import styles from "./AuctionList.module.css";
import Link from "next/link";
import Router from "next/router";
const Auction = (props) => {
  const handleMoreButton = () => {
    // Your logic here
    console.log(props);

    // If you want to navigate to the specified link when the button is clicked
    if (props.auctionID) {
      // Perform navigation or any other action
      console.log(`Navigate to /admin/information/auctioninfo/${props.auctionID}`);
      Router.push(`/admin/information/auctioninfo/${props.auctionID}`);
    }
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
