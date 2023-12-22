import styles from "@/components/Admin/Proposals/AdminProposalsPage.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProposedAuction from "@/components/Artist/AuctionForms/Auction";

const AuctionProposeList = ({auctions}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Ended Auctions</h1>
        <button className={styles.filterButton}>
          <TuneIcon fontSize="medium"></TuneIcon>
        </button>
        <button className={styles.filterButton}>
          <FilterListIcon fontSize="medium"></FilterListIcon>
        </button>
      </div>

      <div className={styles.proposalListContainer}>
      {auctions.map((auction) => (
        auction.auction_status === "ended" ? (
          <ProposedAuction
            id={auction.auctionID}
            key={auction.auctionID}
            title={auction.title}
            imageUrl={"/photos/loginpage.png"}
            type={auction.type}
            size={auction.size}
            creationDate={auction.creationDate}
            creationPlace={auction.creationPlace}
            auctionProposalDate={auction.auctionProposalDate}
            auctionEndDate={auction.auctionEndDate}
            startingBid={auction.startingBid}
            minimumBidIncrease={auction.minimumBidIncrease}
            description={auction.description}
            artistId={auction.userID}
            artistName={auction.name}
            artistImageUrl={auction.artistImageUrl}
            bids={auction.bids} // BU DEGİŞECEK
          />
        ) : null
    ))}
      </div>
    </div>
  );
};

export default AuctionProposeList;