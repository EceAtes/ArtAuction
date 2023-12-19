import React, { useState } from 'react';
import styles from './CollectionModal.module.css'; // Create a corresponding CSS file


const CollectionModal = ({ isOpen, onClose }) => {
    const [selectedOption, setSelectedOption] = useState('');

    // State to store the value entered by the user in the input field
    const [newCollectionName, setNewCollectionName] = useState('');
  
    // State to store the list of collections
    const [collections, setCollections] = useState([
      { id: 1, name: 'Existing Collection 1' },
      { id: 2, name: 'Existing Collection 2' },
    ]);
  
    // Handler function for radio button changes
    const handleRadioChange = (event) => {
      setSelectedOption(event.target.value);
      setNewCollectionName(''); // Reset input field when changing selection
    };
  
    // Handler function for input field changes
    const handleInputChange = (event) => {
      setNewCollectionName(event.target.value);
    };
  
    // Handler function for creating a new collection
    const handleCreateCollection = () => {
      if (newCollectionName.trim() !== '') {
        // Create a new collection object
        const newCollection = {
          id: collections.length + 1,
          name: newCollectionName.trim(),
        };
  
        // Update the list of collections
        setCollections([...collections, newCollection]);
  
        // Select the newly created collection
        setSelectedOption(newCollectionName.trim());
  
        // Reset the input field
        setNewCollectionName('');
      }
    };
  
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className = {styles.modalTopContent}>
                <h2>ADD TO COLLECTION</h2>
                <button onClick={onClose} className={styles.modalButton}>CLOSE</button>
            </div>
            <div className = {styles.modalBottomContent}>
                            
                {collections.map((collection) => (
                    <label key={collection.id}>
                    <input
                        type="radio"
                        value={collection.name}
                        checked={selectedOption === collection.name}
                        onChange={handleRadioChange}
                    />
                    {collection.name}
                    </label>
                ))}

                {/* Option to create a new collection */}
                <label>
                    <input
                    type="radio"
                    value="newCollection"
                    checked={selectedOption === 'newCollection'}
                    onChange={handleRadioChange}
                    />
                    Create new collection
                </label>

                {/* Input field for new collection name */}
                {selectedOption === 'newCollection' && (
                    <div>
                    <label>New Collection Name:</label>
                    <input
                        type="text"
                        value={newCollectionName}
                        onChange={handleInputChange}
                    />
                    <button className = {styles.modalButton} onClick={handleCreateCollection}>Create Collection</button>
                    </div>
                )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionModal;
