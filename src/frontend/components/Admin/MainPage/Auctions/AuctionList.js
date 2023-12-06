import Auction from "./Auction";
import styles from "./AuctionList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
const auctions = [
  {
    id: 1,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
    availableExhibitions: [
      {
        id: 1,
        title: "Exhibition 1",
      },
      {
        id: 2,
        title: "Exhibition 2",
      },
      {
        id: 3,
        title: "Exhibition 3",
      },
      {
        id: 4,
        title: "Exhibition 4",
      },
    ],
  },

  {
    id: 2,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-2",
    availableExhibitions: [
      {
        id: 1,
        title: "Exhibition 1",
      },
      {
        id: 2,
        title: "Exhibition 2",
      },
      {
        id: 3,
        title: "Exhibition 3",
      },
      {
        id: 4,
        title: "Exhibition 4",
      },
    ],
  },

  {
    id: 3,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-3",
    availableExhibitions: [
      {
        id: 1,
        title: "Exhibition 1",
      },
      {
        id: 2,
        title: "Exhibition 2",
      },
      {
        id: 3,
        title: "Exhibition 3",
      },
      {
        id: 4,
        title: "Exhibition 4",
      },
    ],
  },

  {
    id: 4,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-4",
    availableExhibitions: [
      {
        id: 1,
        title: "Exhibition 1",
      },
      {
        id: 2,
        title: "Exhibition 2",
      },
      {
        id: 3,
        title: "Exhibition 3",
      },
      {
        id: 4,
        title: "Exhibition 4",
      },
    ],
  },
  {
    id: 5,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-5",
    availableExhibitions: [
      {
        id: 1,
        title: "Exhibition 1",
      },
      {
        id: 2,
        title: "Exhibition 2",
      },
      {
        id: 3,
        title: "Exhibition 3",
      },
      {
        id: 4,
        title: "Exhibition 4",
      },
    ],
  },

  {
    id: 6,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-6",
    availableExhibitions: [
      {
        id: 1,
        title: "Exhibition 1",
      },
      {
        id: 2,
        title: "Exhibition 2",
      },
      {
        id: 3,
        title: "Exhibition 3",
      },
      {
        id: 4,
        title: "Exhibition 4",
      },
    ],
  },

  {
    id: 7,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-7",
    availableExhibitions: [
      {
        id: 1,
        title: "Exhibition 1",
      },
      {
        id: 2,
        title: "Exhibition 2",
      },
      {
        id: 3,
        title: "Exhibition 3",
      },
      {
        id: 4,
        title: "Exhibition 4",
      },
    ],
  },
];

const AuctionList = (props) => {
  return (
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
            id = {auction.id}
            key={auction.id}
            imageUrl={auction.imageUrl}
            auctionName={auction.auctionName}
            availableExhibitions = {auction.availableExhibitions}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
