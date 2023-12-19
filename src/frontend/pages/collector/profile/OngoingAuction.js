'use client'
import { useState } from 'react';
import AuctionInfo from '@/components/Collector/Profile/AuctionInfo';
import styles from "./OngoingAuctions.module.css";
import ArtworkModal from '@/components/Collector/Profile/ArtworkModal';


export default function OngoingAuctions({ title, auctions }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter auctions based on search query
  const filteredAuctions = auctions.filter((auction) =>
    auction.auctionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const auctionItems = filteredAuctions.map((auction) => (
    <AuctionInfo
      key={auction.id}
      imageUrl={auction.imageUrl}
      auctionName={auction.auctionName}
      artworkType = {auction.artworkType}
      leadingBid = {auction.leadingBid}
      minimumBidIncrease = {auction.minimumBidIncrease}
      creationDate = {auction.creationDate}
      
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
    <div className={styles.ongoing}>
      <div className={styles.mainContainer}>
        <div className = {styles.topSection}> 
            <h1 className={styles.listHeader}>{title}</h1>
        
            <input
            type="text"
            placeholder="Search auctions..."
            value={searchQuery}
            className = {styles.input}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={styles.button} onClick={openModal}>
                FILTER
            </button>
            <ArtworkModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <div className={styles.auctionListContainer}>{auctionItems}</div>
      </div>
    </div>
  );
}
