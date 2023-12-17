import React from 'react';
import styles from './AuctionEdit.module.css'
import { Button } from '@mui/material';

const saveClick =()=> {

}
const uploadClick = () =>{

}

const EditAuction = () => {
  return (
    <div className={styles.EditAuction}>
      <h1 className={styles.EditAuction}>Edit Auction</h1>
      <div style={{margin:"30px 0"}}>
          <input
            type="file"
            id="upload"
            accept=".png"
            onClick={uploadClick}
            style={{ display: 'none' }}
          />
          <label for="upload" style={{display: "inline-block", backgroundColor: "purple", color: "white", padding: "0.5rem", fontFamily: "sans-serif",
              borderRadius: "0.3rem", cursor: "pointer", marginTop: "1rem"}}>Upload Artwork</label>
          <></>
          <span>
            No file chosen.
          </span>
      </div>

      <form className={styles.EditAuction}>
        <div className={styles.EditAuction}>
          <label className={styles.EditAuction} htmlFor="itemName">Artwork Name:</label>
          <input className={styles.EditAuction} type="text" id="itemName" name="itemName" />
        </div>

        <div>
          <label className={styles.EditAuction} htmlFor="category">Category:</label>
          <select className={styles.EditAuction} id="category" name="category">
            {/* Add your category options here */}
            <option className={styles.EditAuction} value="category1">Painting</option>
            <option className={styles.EditAuction} value="category2">Sculpture</option>
            <option className={styles.EditAuction} value="category3">Photography</option>
            <option className={styles.EditAuction} value="category4">Print</option>
            <option className={styles.EditAuction} value="category5">Collage</option>
            <option className={styles.EditAuction} value="category6">Mied Media</option>
            <option className={styles.EditAuction} value="category7">Print Making</option>
            <option className={styles.EditAuction} value="category8">Drawig</option>
            <option className={styles.EditAuction} value="category9">Ceramics</option>
            <option className={styles.EditAuction} value="category10">Digital Art</option>
            <option className={styles.EditAuction} value="category11">Other</option>
          </select>

          <label className={styles.EditAuction} htmlFor="priority">Width:</label>
          <input className={styles.EditAuction} type="number" id="min-bid" name="min-bid" />
          
          <label className={styles.EditAuction} htmlFor="priority">Length:</label>
          <input className={styles.EditAuction} type="number" id="min-bid" name="min-bid" />

        </div>

        <div className={styles.EditAuction}>
          <label className={styles.EditAuction} htmlFor="startDate">Start Date:</label>
          <input  className={styles.EditAuction}type="date" id="startDate" name="startDate" />

          <label className={styles.EditAuction} htmlFor="endDate">End Date:</label>
          <input className={styles.EditAuction} type="date" id="endDate" name="endDate" />
        </div>

        <div>
          <label className={styles.EditAuction} htmlFor="priority">Minimum Bid Amound:</label>
          <input className={styles.EditAuction} type="number" id="min-bid" name="min-bid" />

          <label className={styles.EditAuction} htmlFor="bidIncrement">Bid Increment:</label>
          <input className={styles.EditAuction} type="number" id="bidIncrement" name="bidIncrement" />
        </div>

        <div className={styles.EditAuction}>
          <label className={styles.EditAuction} htmlFor="description">Description:</label>
          <textarea className={styles.EditAuction} id="description" name="description" rows="4" />
        </div>

        <Button variant="contained" color="secondary" onClick={saveClick}>Save</Button>
      </form>
    </div>
  );
};

export default EditAuction;