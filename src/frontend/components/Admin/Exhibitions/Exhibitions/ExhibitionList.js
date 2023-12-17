import styles from "./Exhibition.module.css";

import Exhibition from "./Exhibition";

const exhibitions = [
  {
    id: 1,
    title: "New Year Reflections: An Auction Exhibition of Hope and Renewal",
    description:
      "Each masterpiece in this exhibition captures the essence of this historic milestone, reflecting the rich heritage and progress of the Turkish Republic. Join us in celebrating this momentous occasion and bidding on these remarkable artworks that encapsulate the spirit of a nation's journey",
    auctions: [
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
    ],
  },
  {
    id: 2,
    title: "New Year Reflections: An Auction Exhibition of Hope and Renewal",
    description: "",
    auctions: [
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
    ],
  },
];

const ExhibitionList = (props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Exhibitions</h1>
      </div>

      <div className={styles.exhibitionListContainer}>
        {props.exhibitions.map((exhibition) => (
          <Exhibition
            key={exhibition.exhibitionID}
            id={exhibition.exhibitionID}
            title={exhibition.exhibitionName}
            description={exhibition.exhibitionDescriptor}
            auctions={exhibition.auctions}
          />
        ))}
      </div>
    </div>
  );
};

export default ExhibitionList;
