import React, { useState } from 'react';
import styles from './ArtworkModal.module.css'; // Create a corresponding CSS file
import { auctionGetPopularAuctionsApiFunction } from '@/pages/api/auction';

const startDate = new Date('2023-01-01');
const endDate = new Date('2023-12-31');

const ArtworkModal = ({ isOpen, onClose,onFilterUpdate }) => {
  const [artworkType, setArtworkType] = useState([]);
  const [leadingBid, setLeadingBid] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [lowBid, setLowBid] = useState(''); // Initialize lowBid
  const [highBid, setHighBid] = useState(''); // Initialize highBid

  const [minimumBidIncrease,setMinimumBidIncrease] = useState('');
  const [lowMinimumBidIncrease,setLowMinimumBidIncrease] = useState('');
  const [highMinimumBidIncrease,setHighMinimumBidIncrease] = useState('');

  const [selectedStartDate, setSelectedStartDate] = React.useState(startDate);
  const [selectedDate, setSelectedDate] = React.useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(startDate);
  const [allAuctions,setAllAuctions] = useState();
  const dateRange = (endDate - startDate) / (1000 * 60 * 60 * 24); // Calculate the range in days

  const handleEndDateChange = (e) => {
    const selectedDays = parseInt(e.target.value, 10);
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + selectedDays);
    setSelectedEndDate(newDate);
  };

  const handleDateChange = (e) => {
    const selectedDays = parseInt(e.target.value, 10);
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + selectedDays);
    setSelectedDate(newDate);
  };

  const handleStartDateChange = (e) => {
    const selectedDays = parseInt(e.target.value, 10);
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + selectedDays);
    setSelectedStartDate(newStartDate);
  };

  const handleSubmit = async () => {
    try {
      // Fetch data from the API
      const data = await auctionGetPopularAuctionsApiFunction();
      console.log(data);
  
      // Set the fetched data to the state variable
      setAllAuctions(data);
  
      // Apply filters based on the selected values
      const filteredAuctions = data.filter((auction) => {
        if (artworkType.length > 0 && !artworkType.includes(auction.artworkType)) {
          return false;
        }
  
        if (leadingBid === 'custom' && (auction.leadingBid < lowBid || auction.leadingBid > highBid)) {
          return false;
        }
  
        if (creationDate && auction.creationDate < selectedStartDate) {
          return false;
        }
  
        if (minimumBidIncrease === 'custom' && (auction.minimumBidIncrease < lowMinimumBidIncrease || auction.minimumBidIncrease > highMinimumBidIncrease)) {
          return false;
        }
  
        // Add similar conditions for other filters as needed
        // ...
  
        return true;
      });
  
      // Pass the filtered data to the parent component
      onFilterUpdate(filteredAuctions);
  
      // Set the filtered data to the state variable
      //setPopularAuctions(filteredAuctions);
    } catch (error) {
      console.error('Error fetching or filtering popular auctions:', error.message);
    }
  };
  
  const handleCheckboxChange = (value) => {
    if (artworkType.includes(value)) {
      setArtworkType(artworkType.filter((type) => type !== value));
    } else {
      setArtworkType([...artworkType, value]);
    }
  };
  
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className = {styles.modalTopContent}>
                <h2>Ongoing Auction Filters</h2>
                <button onClick={onClose} className={styles.modalButton}>RESET</button>
                <button onClick={handleSubmit} className = {styles.modalButton}>APPLY</button>
            </div>
            <div className = {styles.modalBottomContent}>
                <div className = {styles.artworkType}>
                    <label>
                    Artwork Type:
                    </label>
                    <ul>
                    <li>
                        <label>
                        <input
                            type="checkbox"
                            value="Oil Painting"
                            checked={artworkType.includes('Oil Painting')}
                            onChange={() => handleCheckboxChange('Oil Painting')}
                        />
                        Oil Painting
                        </label>
                    </li>

                    <li>
                        <label>
                            <input
                            type="checkbox"
                            value="Sculpture"
                            checked={artworkType.includes('Sculpture')}
                            onChange={() => handleCheckboxChange('Sculpture')}
                            />
                            Sculpture
                        </label>
                        </li>
                        <li>
                            <label>
                            <input
                            type="checkbox"
                            value="Collage"
                            checked={artworkType.includes('Collage')}
                            onChange={() => handleCheckboxChange('Collage')}
                            />
                            Collage
                            </label>
                            
                        </li>
                        <li>
                            <label>
                            <input
                            type="checkbox"
                            value="Mixed Media"
                            checked={artworkType.includes('Mixed Media')}
                            onChange={() => handleCheckboxChange('Mixed Media')}
                            />
                            Mixed Media 
                            </label>
                            
                        </li>
                        <li>
                            <label>
                            <input
                            type="checkbox"
                            value="Printmaking"
                            checked={artworkType.includes('Printmaking')}
                            onChange={() => handleCheckboxChange('Printmaking')}
                            />
                            Printmaking
                            </label>
                        </li>
                        <li> 
                            <label>
                            <input
                            type="checkbox"
                            value="Drawing"
                            checked={artworkType.includes('Drawing')}
                            onChange={() => handleCheckboxChange('Drawing')}
                            />
                            Drawing
                            </label>
                        </li>
                        <li>
                            <label>
                            <input
                            type="checkbox"
                            value="Ceramics"
                            checked={artworkType.includes('Ceramics')}
                            onChange={() => handleCheckboxChange('Ceramics')}
                            />
                            Ceramics
                            </label>
                        </li>
                        <li>
                            <label>
                            <input
                            type="checkbox"
                            value="Digital Art"
                            checked={artworkType.includes('Digital Art')}
                            onChange={() => handleCheckboxChange('Digital Art')}
                            />
                            Digital Art
                            </label>
                        
                        </li>
                        <li>
                            <label>
                            <input
                            type="checkbox"
                            value="Other"
                            checked={artworkType.includes('Other')}
                            onChange={() => handleCheckboxChange('Other')}
                            />
                            Other  
                            </label>
                            
                        </li>
                    {/* Add more checkboxes for other artwork types */}
                    </ul>

                </div>
                
                
                <div className={styles.leadingBidOptions}>
                    <label>Leading Bid:</label>
                    <label>
                    <input
                        type="radio"
                        name="leadingBid"
                        value="any"
                        checked={leadingBid === 'any'}
                        onChange={() => setLeadingBid('any')}
                    />
                    Any
                    </label>

                    <label>
                    <input
                        type="radio"
                        name="leadingBid"
                        value="custom"
                        checked={leadingBid === 'custom'}
                        onChange={() => setLeadingBid('custom')}
                    />
                    Custom
                    </label>

                    {leadingBid === 'custom' && (
                    <div className= {styles.customRange}>
                        <label>Low:</label>
                        <input
                        type="number"
                        value={lowBid}
                        onChange={(e) => setLowBid(e.target.value)}
                        />

                        <label>High:</label>
                        <input
                        type="number"
                        value={highBid}
                        onChange={(e) => setHighBid(e.target.value)}
                        />
                    </div>
                    )}
                </div>


                <div className={styles.minimumBidIncreaseOptions}>
                    <label>Minimum Bid Increase:</label>
                    <label>
                        <input
                        type="radio"
                        name="minimumBidIncrease"
                        value="any"
                        checked={minimumBidIncrease === 'any'}
                        onChange={() => setMinimumBidIncrease('any')}
                        />
                        Any
                    </label>

                    <label>
                        <input
                        type="radio"
                        name="minimumBidIncrease"
                        value="custom"
                        checked={minimumBidIncrease === 'custom'}
                        onChange={() => setMinimumBidIncrease('custom')}
                        />
                        Custom
                    </label>

                    {minimumBidIncrease === 'custom' && (
                        <div className= {styles.customRange}>
                        <label>Low:</label>
                        <input
                            type="number"
                            value={lowMinimumBidIncrease}
                            onChange={(e) => setLowMinimumBidIncrease(e.target.value)}
                        />

                        <label>High:</label>
                        <input
                            type="number"
                            value={highMinimumBidIncrease}
                            onChange={(e) => setHighMinimumBidIncrease(e.target.value)}
                        />
                        </div>
                    )}
                </div>


                <div className={styles.creationDate}>
                    <label>
                        Creation Date:
                        <input
                        type="range"
                        min="0"
                        max={dateRange}
                        value={(selectedDate - startDate) / (1000 * 60 * 60 * 24)}
                        onChange={handleDateChange}
                        />
                        {/* Display the selected creation date value */}
                        {selectedDate.toISOString().split('T')[0]}
                    </label>
                </div>


                <div className={styles.startDate}>
                    <label>
                        Start Date:
                        <input
                        type="range"
                        min="0"
                        max={dateRange}
                        value={(selectedStartDate - startDate) / (1000 * 60 * 60 * 24)}
                        onChange={handleStartDateChange}
                        />
                        {/* Display the selected start date value */}
                        {selectedStartDate.toISOString().split('T')[0]}
                    </label>
                </div>
               
                <div className={styles.endDate}>
                    <label>
                        End Date:
                        <input
                        type="range"
                        min="0"
                        max={dateRange}
                        value={(selectedEndDate - startDate) / (1000 * 60 * 60 * 24)}
                        onChange={handleEndDateChange}
                        />
                        {/* Display the selected start date value */}
                        {selectedEndDate.toISOString().split('T')[0]}
                    </label>
                </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtworkModal;
