import Auction from "./Auction";
import styles from "./AuctionList.module.css";

const auctions = [
  {
    id: 1,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },

  {
    id: 2,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },

  {
    id: 3,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },

  {
    id: 4,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },
  {
    id: 5,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },

  {
    id: 6,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },

  {
    id: 7,
    imageUrl: "/photos/loginpage.png",
    auctionName: "Others Auction-1",
  },
];

const AuctionList = (props) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.listHeader}>Auctions</h1>

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