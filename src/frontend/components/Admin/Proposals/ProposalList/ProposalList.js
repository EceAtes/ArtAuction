import styles from "./ProposalList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import Proposal from "./Proposal";

const ProposalList = (props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Auction Proposals</h1>
        <button className={styles.filterButton}>
          <TuneIcon fontSize="medium"></TuneIcon>
        </button>
        <button className={styles.filterButton}>
          <FilterListIcon fontSize="medium"></FilterListIcon>
        </button>
      </div>

      <div className={styles.proposalListContainer}>
        {props.proposedAuctions.map((auction) => (
          <Proposal
            auctionID={auction.auctionID}
            key={auction.auctionID}
            title={auction.title}
            imageUrl={"/photos/loginpage.png"}
            type={auction.type}
            size={auction.size}
            creationDate={auction.creationDate}
            creationPlace={auction.creationPlace}
            auctionProposalDate={auction.startDate}
            auctionEndDate={auction.endDate}
            baseBid={auction.baseBid}
            minimumBidIncrease={auction.minimumBidIncrease}
            description={auction.description}
            artistId={auction.uploaded_by_artist_ID}
            artistName={auction.artistName}
            artistImageUrl={"/photos/signuppage.png"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProposalList;
