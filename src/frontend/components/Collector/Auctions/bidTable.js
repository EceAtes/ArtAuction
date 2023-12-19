// BidTable.js
import React from 'react';
import styles from './bidTable.module.css';
const BidTable = ({ bids }) => {
  return (
    <table className={styles.bidTable}>
        <thead>
            <tr>
            <th>Bid Status</th>
            <th>Bid Amount</th>
            <th>Time Placed</th>
            </tr>
        </thead>
        <tbody>
        {bids.map((bid) => (
          <tr key={bid.id}>
            <td>{bid.status}</td>
            <td>${bid.amount}</td>
            <td>{bid.timePlaced}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BidTable;



                   
