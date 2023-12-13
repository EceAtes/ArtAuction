import React from 'react';
import styles from './Profile.module.css';

const FollowButton = ({ label, pageUrl }) => {
  const openPopup = () => {
    const popupWindow = window.open(pageUrl, '_blank', 'width=600,height=400');
  };

  return (
    <button className={styles.followButtonStyle} onClick={openPopup}>
      {label}
    </button>
  );
};

const Profile = (props) => {
  return (
    <div className={styles.containerStyle}>
      <div className={styles.imageContainerStyle}>
        <img
          src="url-to-your-circular-image.jpg"
          alt="Artist"
          className={styles.imageStyle}
        />
      </div>
      <div className={styles.textContainerStyle}>
        <h2 className={styles.artistNameStyle}>{props.name}</h2>
        <p className={styles.gmailStyle}>{props.gmail}</p>
        <p className={styles.tokenNumberStyle}>Token Number: {props.tokens}</p>
        <p className={styles.bioTextStyle}>{props.bio}</p>
        <div className={styles.buttonContainerStyle}>
          <FollowButton label="Follow" pageUrl="/follow-page" />
          <FollowButton label="Followed" pageUrl="/followed-page" />
        </div>
        <button className={styles.uploadButtonStyle}>Upload Artwork</button>
      </div>
    </div>
  );
};

export default Profile;
//LINK UPLOAD ARTWORK TO EDIT AUCTION PAGE
