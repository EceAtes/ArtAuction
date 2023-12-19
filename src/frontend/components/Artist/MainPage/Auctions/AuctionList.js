import React, { useState } from "react";
import Auction from "./Auction";
import styles from "./AuctionList.module.css";
import CollectionModal from "./CollectionModal";

const AuctionList = (props) => {
  const [auctions, setAuctions] = useState(props.auctions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.topSection}>
          <h1 className={styles.listHeader}>{props.title}</h1>
          <button className={styles.moreButton} onClick={openModal}>
            FILTER
          </button>
          <CollectionModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <div className={styles.auctionListContainer}>
          {auctions.map((auction) => (
            <Auction
              key={auction.auctionID}
              auctionID={auction.auctionID}
              imageUrl={"/photos/loginpage.png"}
              title={auction.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AuctionList;
