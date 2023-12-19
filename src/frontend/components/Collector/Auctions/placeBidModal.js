import React, { useState, useEffect} from 'react';
import styles from './placeBidModal.module.css'

const PlaceBidModal = ({ auctionName, endDate, startingBid, minimumBidIncrease, leadingBid, onClose,onSubmitBid }) => {
  const [bidType, setBidType] = useState('auto');
  const [customBidAmount, setCustomBidAmount] = useState('');
  const [modalLeadingBid, setModalLeadingBid] = useState(leadingBid);
  

  const handleBidTypeChange = (type) => {
    setBidType(type);
  };

  const handleCustomBidAmountChange = (e) => {
    setCustomBidAmount(e.target.value);
  };

  const handleClose = () => {
    onClose();
  }
  const handleSubmitBid = () => {
    let bidAmount;

    if (modalLeadingBid === 0) {
      bidAmount = Number(startingBid) + Number(minimumBidIncrease);
    }
    if (bidType === 'auto') {
      bidAmount = Number(modalLeadingBid) + Number(minimumBidIncrease);
    } 
    else {
      // Use custom bid amount
      bidAmount = customBidAmount;
    }
  
    // Update modalLeadingBid state with the new bidAmount
    setModalLeadingBid(bidAmount);
  
    // Perform any necessary logic based on bid type and custom bid amount
    const newBid = {
      id: Date.now(),
      status: 'Some Status',
      amount: bidAmount,
      timePlaced: new Date().toLocaleTimeString(),
    };
  
    // Pass the new bid to the parent component
    onSubmitBid(newBid);
  
    // Close the modal
    onClose();
  };
  
  


  return (
    <div className={styles.placeBidModalOverlay}>
      <div className={styles.placeBidModalContent}>
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>{auctionName}</h2>
        <div className={styles.titles}>
            <label>Minimum Bid Increase: {minimumBidIncrease}</label>
            <label style = {{color: 'green'}}>Leading Bid: {modalLeadingBid}</label>
            <label>Starting Bid: {startingBid}</label>
            <label>Auction End Date: {endDate}</label>
        </div>

        <div className = {styles.radioButtons}>
            <label>
            <input
                type="radio"
                name="bidType"
                value="auto"
                checked={bidType === 'auto'}
                onChange={() => handleBidTypeChange('auto')}
            />
            <p>{`Auto: ${Number(minimumBidIncrease) + Number(modalLeadingBid)} tokens`}</p>
            </label>
            <label>
            <input
                type="radio"
                name="bidType"
                value="custom"
                checked={bidType === 'custom'}
                onChange={() => handleBidTypeChange('custom')}
            />
            <p> Enter Bid Amount </p>
            </label>
        </div>

        {bidType === 'custom' && (
            <div className = {styles.customBid}>
            <label>
                Custom Bid Amount:    
                <input
                type="number"
                value={customBidAmount}
                onChange={handleCustomBidAmountChange}
                min= {Number(modalLeadingBid) + Number(minimumBidIncrease) + 1}
                placeholder= {`Minimum: ${Number(modalLeadingBid) + 1 + Number(minimumBidIncrease)}`}
                />
            </label>
            </div>
        )}
        <button className = {styles.placeBidButton} onClick={handleSubmitBid}>Submit Bid</button>
        <button className = {styles.placeBidButton} onClick={handleClose}>Close</button>
      </div>
    </div>
    /*
    <div className={styles.placeBidModalOverlay}>
      <div className={styles.placeBidModalContent}>
       
        <div className = {styles.column}>
            <p>Auction End Date: {endDate}</p>
            <p>Starting Bid: {startingBid}</p>
           
        </div>
        <div className = {styles.column}>
            
            <p>Minimum Bid Increase: {minimumBidIncrease}</p>
            <p>Leading Bid: {leadingBid}</p>
        </div>
          
        <div>
            <label>
            <input
                type="radio"
                name="bidType"
                value="auto"
                checked={bidType === 'auto'}
                onChange={() => handleBidTypeChange('auto')}
            />
            Auto
            </label>
            <label>
            <input
                type="radio"
                name="bidType"
                value="custom"
                checked={bidType === 'custom'}
                onChange={() => handleBidTypeChange('custom')}
            />
            Enter Bid Amount
            </label>
        </div>

        {bidType === 'custom' && (
            <div>
            <label>
                Custom Bid Amount:
                <input
                type="number"
                value={customBidAmount}
                onChange={handleCustomBidAmountChange}
                min="181" // Assuming the minimum bid amount is 180
                />
            </label>
            </div>
        )}

        <button onClick={handleSubmitBid}>Submit Bid</button>
      </div>
    </div>*/
  );
};

export default PlaceBidModal;
