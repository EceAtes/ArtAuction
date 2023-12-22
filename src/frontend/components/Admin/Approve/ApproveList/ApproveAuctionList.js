import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import styles from "./ApproveAuctionList.module.css";
import SortModal from "./SortModal";
import ApproveAuction from "./ApproveAuction";

const ApproveAuctionList = (props) => {
  const [auctions, setAuctions] = useState(props.approveAuctions);
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false); //havent done
  const handleSortModalOpen = (event) => {
    setSortModalOpen(!isSortModalOpen);
  };

  const handleSortModalClose = () => {
    setSortModalOpen(false);
  };

  const handleSortFunction = (event, choice) => {
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
        <h1 className={styles.listHeader}>Auction Approve</h1>
        {/* <button className={styles.filterButton}>
          <TuneIcon fontSize="medium"></TuneIcon>
        </button>*/}

        <button className={styles.filterButton} onClick={handleSortModalOpen}>
          <FilterListIcon fontSize="medium"></FilterListIcon>
        </button>
      </div>

      <div className={styles.proposalListContainer}>
        {auctions.map((auction) => (
          <ApproveAuction
            auctionID={auction.auctionID}
            key={auction.auctionID}
            title={auction.title}
            imageUrl={"/photos/loginpage.png"}
            type={auction.type}
            size={auction.size}
            creationDate={auction.creationDate}
            auctionEndDate={auction.endDate}
            baseBid={auction.baseBid}
            minimumBidIncrease={auction.minimumBidIncrease}
            description={auction.description}
            artistId={auction.uploaded_by_artist_ID}
            artistName={auction.name}
            leadingBid={auction.leadingBid}
            artistImageUrl={"/photos/signuppage.png"}
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

export default ApproveAuctionList;
