import React from 'react';
import styles from './AuctionEdit.module.css'

const EditAuction = () => {
  return (
    <div className={styles.EditAuction}>
      <h1 className={styles.EditAuction}>Edit Auction</h1>
      <form className={styles.EditAuction}>
        <div className={styles.EditAuction}>
          <label className={styles.EditAuction} htmlFor="itemName">Artwork Name:</label>
          <input className={styles.EditAuction} type="text" id="itemName" name="itemName" />
        </div>

        <div>
          <label className={styles.EditAuction} htmlFor="category">Category:</label>
          <select className={styles.EditAuction} id="category" name="category">
            {/* Add your category options here */}
            <option className={styles.EditAuction} value="category1">Category 1</option>
            <option className={styles.EditAuction} value="category2">Category 2</option>
          </select>

          <label className={styles.EditAuction} htmlFor="condition">Width:</label>
          <select className={styles.EditAuction} id="condition" name="condition">
            {/* Add your condition options here */}
            <option className={styles.EditAuction} value="new">New</option>
            <option className={styles.EditAuction} value="used">Used</option>
          </select>

          <label className={styles.EditAuction} htmlFor="status">Length:</label>
          <select className={styles.EditAuction} id="status" name="status">
            {/* Add your status options here */}
            <option className={styles.EditAuction} value="active">Active</option>
            <option className={styles.EditAuction} value="inactive">Inactive</option>
          </select>

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

        <button className={styles.EditAuction} type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditAuction;