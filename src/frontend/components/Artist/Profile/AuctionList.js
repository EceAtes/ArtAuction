import styles from "./AuctionProposeList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProposedAuction from "@/components/Artist/AuctionForms/Auction";

const auctions = [
  {
    id: 1,
    title: "My Work-1",
    imageUrl: "/photos/loginpage.png",
    type: "Oil Painting",
    size: "70x20 cm",
    creationDate: "11.11.2023",
    creationPlace: "Ankara, Turkey",
    auctionProposalDate: "11.11.2023",
    auctionEndDate: "18.11.2023",
    startingBid: 100,
    minimumBidIncrease: 40,
    description:
      "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ",
    artistId: 1,
    artistName: "Ali veli",
    artistImageUrl: "/photos/signuppage.png",
  },
  {
    id: 2,
    title: "My Work-1",
    imageUrl: "/photos/loginpage.png",
    type: "Oil Painting",
    size: "70x20 cm",
    creationDate: "11.11.2023",
    creationPlace: "Ankara, Turkey",
    auctionProposalDate: "11.11.2023",
    auctionEndDate: "18.11.2023",
    startingBid: 100,
    minimumBidIncrease: 40,
    description:
      "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test",
    artistId: 1,
    artistName: "Ali veli",
    artistImageUrl: "/photos/signuppage.png",
  },
];

const AuctionProposeList = (props) => {
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
          <ProposedAuction
            id={auction.id}
            key={auction.id}
            title={auction.title}
            imageUrl={auction.imageUrl}
            type={auction.type}
            size={auction.size}
            creationDate={auction.creationDate}
            creationPlace={auction.creationPlace}
            auctionProposalDate={auction.auctionProposalDate}
            auctionEndDate={auction.auctionEndDate}
            startingBid={auction.startingBid}
            minimumBidIncrease={auction.minimumBidIncrease}
            description={auction.description}
            artistId={auction.artistId}
            artistName={auction.artistName}
            artistImageUrl={auction.artistImageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionProposeList;