import React from 'react';
import styles from './Profile.module.css';
import { Button } from '@mui/material';

const FollowButton = ({ label, pageUrl }) => {
  const openPopup = () => {
    const popupWindow = window.open(pageUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Button variant="contained" color= "secondary" onClick={openPopup}>
      {label}
    </Button>
  );
};

const Profile = (props) => {
  return (
    <div className={styles.containerStyle}>
      <div className={styles.imageContainerStyle}>
        <img
          width="10%"
          src="/photos/profile.png"
          alt="Artist"
          className={styles.imageStyle}
        />
      </div>
      <div className={styles.textContainerStyle}>
        <div style={{margin: '5% 0'}}>
          <h2 className={styles.artistNameStyle}>Leonardo DiCaprio</h2>
        </div>
        <div style={{margin: '5% 0'}}>
          <p className={styles.gmailStyle}>leo@gmail.com</p>
        </div>
        <div style={{margin: '5% 0'}}>
          <p className={styles.tokenNumberStyle}>Token Number: 1500</p>
        </div>
        <div style={{margin: '5% 0'}}>
        <div style={{margin: '5% 0'}}>
          <p className={styles.bioTextStyle}>Hiii, I only date 25 and younger women</p>
        </div>
        <div style={{margin: '5% 0'}}></div>
        </div>
        <div className={styles.buttonContainerStyle}>
          <FollowButton label="Follow" pageUrl="/follow-page"/>
          <FollowButton label="Followed" pageUrl="/followed-page" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
//LINK UPLOAD ARTWORK TO EDIT AUCTION PAGE
