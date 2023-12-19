import React from 'react';
import styles from './CollectorList.module.css'; // Import the CSS module

const Collector = ({ name, profilePicture, description }) => (
  <div className={styles.collectorBox}>
    <img className={styles.profilePicture} src={profilePicture} alt={`Profile of ${name}`} />
    <div className={styles.collectorInfo}>
      <h3>{name}</h3>
      <p>{description}</p>
      <button className = {styles.button}>See Profile</button>
    </div>
  </div>
);

export default Collector;
