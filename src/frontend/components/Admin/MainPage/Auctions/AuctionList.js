import Auction from "./Auction";
import styles from "./AuctionList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import SortModal from "./SortModal";

const AuctionList = (props) => {
  const [auctions, setAuctions] = useState(props.auctions);
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false); //havent done

  const handleSortModalOpen = (event) => {
    setSortModalOpen(!isSortModalOpen);
  };

  const handleSortModalClose = () => {
    setSortModalOpen(false);
  };

  const handleSortFunction = (event,choice) => {
    event.preventDefault();
    let sortedAuctions = [...auctions];

    switch (choice) {
      case "1": // Name Ascending
        sortedAuctions.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "2": // Name Descending
        sortedAuctions.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "3": // Date Ascending
        sortedAuctions.sort(
          (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
        );
        break;
      case "4": // Date Descending
        sortedAuctions.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
        break;
    }

    setAuctions(sortedAuctions);
    setSortModalOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Auctions</h1>
        <button className={styles.filterButton}>
          <TuneIcon fontSize="medium"></TuneIcon>
        </button>
        <button className={styles.filterButton} onClick={handleSortModalOpen}>
          <FilterListIcon fontSize="medium"></FilterListIcon>
        </button>
      </div>

      <div className={styles.auctionListContainer}>
        {auctions.map((auction) => (
          <Auction
            auctionID={auction.auctionID}
            key={auction.auctionID}
            imageUrl={"/photos/loginpage.png"}
            title={auction.title}
            highlighterAdminID={auction.highlighter_admin_ID}
          />
        ))}
      </div>

      {isSortModalOpen && (
        <SortModal
          closeModal={handleSortModalClose}
          submitHandler={handleSortFunction}
        ></SortModal>
      )}
    </div>
  );
};

export default AuctionList;
