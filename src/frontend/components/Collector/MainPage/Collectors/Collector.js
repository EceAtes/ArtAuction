import React from 'react';
import styles from './CollectorList.module.css'; // Import the CSS module

const Collector = ({ name, profilePicture, description }) => (
  <div className={styles['collector-box']}>
    <img className={styles['profile-picture']} src={profilePicture} alt={`Profile of ${name}`} />
    <div className={styles['collector-info']}>
      <h3>{name}</h3>
      <p>{description}</p>
      <button className = {styles['button']}>See Profile</button>
    </div>
  </div>
);

export default Collector;
