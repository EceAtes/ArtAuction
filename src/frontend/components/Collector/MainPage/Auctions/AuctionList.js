'use client'
import React, { useState } from 'react';
import Auction from "./Auction";
import styles from "./AuctionList.module.css";
import CollectionModal from './CollectionModal';


const AuctionList = ({ title, auctions }) => {

  const auctionItems = auctions.map((auction) => (
    <Auction
      key={auction.id}
      imageUrl={auction.imageUrl}
      auctionName={auction.auctionName}
    />
  ));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className = {styles.topSection}>
        <h1 className={styles.listHeader}>{title}</h1>
          <button className={styles.moreButton} onClick={openModal}>
            FILTER
          </button>
          <CollectionModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <div className={styles.auctionListContainer}>{auctionItems}</div>
      </div>
    </>
  );
};



export default AuctionList;

