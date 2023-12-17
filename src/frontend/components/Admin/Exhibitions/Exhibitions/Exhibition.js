import styles from "./Exhibition.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExhibitionAuction from "./Auction";
const Exhibition = (props) => {
  return (
    <div className={styles.exhibitionContainer}>
      <div className={styles.exhibitionHeaderContainer}>
        <h3 className={styles.exhibitionHeader}>{props.title}</h3>
        <div className={styles.buttons}>
          <button className={styles.filterButton}>
            <EditIcon fontSize="medium"></EditIcon>
          </button>
          <button className={styles.filterButton}>
            <DeleteIcon fontSize="medium"></DeleteIcon>
          </button>
        </div>
      </div>

      <div className={styles.description}>
        <p>{props.description}</p>
      </div>

      <div className={styles.auctionListContainer}>
        {props.auctions.map((auction) => (
          /** need to be done */
          <ExhibitionAuction
            key={auction.id}
            imageUrl={"/photos/loginpage.png"}
            auctionName={auction.auctionName}
          />
        ))}
      </div>
    </div>
  );
};

export default Exhibition;
