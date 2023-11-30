import Auction from "./Auction";
import styles from "./AuctionList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from '@mui/icons-material/FilterList';
const auctions = [
  {
    id: 1,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },

  {
    id: 2,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-2",
  },

  {
    id: 3,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-3",
  },

  {
    id: 4,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-4",
  },
  {
    id: 5,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-5",
  },

  {
    id: 6,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-6",
  },

  {
    id: 7,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-7",
  },
];

const AuctionList = (props) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.listHeaderContainer}>
          <h1 className={styles.listHeader}>Auctions</h1>
          <button className={styles.filterButton}>
            <TuneIcon fontSize="medium"></TuneIcon>
          </button>
          <button className={styles.filterButton}>
            <FilterListIcon fontSize="medium"></FilterListIcon>
          </button>
        </div>

        <div className={styles.auctionListContainer}>
          {auctions.map((auction) => (
            <Auction
              key={auction.id}
              imageUrl={auction.imageUrl}
              auctionName={auction.auctionName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AuctionList;
