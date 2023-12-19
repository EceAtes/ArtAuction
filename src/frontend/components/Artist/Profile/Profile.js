import React from 'react';
import styles from './Profile.module.css';
import { Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddAuction from '@/pages/artist/addauction/[userID]';
import Link from 'next/link';
import FollowList from './FollowerList';
import { useState } from 'react';
import {useRouter} from 'next/router';

const Profile = (props) => {
  const followers= [{id: 1, username: "Cezanne"}, {id:2, username:"Picasso"}];
  const follows= [{id: 1, username: "Bansky"}, {id:2, username:"Michalengelo"}, {id:2, username:"DaVinci"}];
  const [followerModal, setFollowerModal]= useState(false);
  const [followingModal, setFollowingModal]= useState(false);
  const router = useRouter();

  console.log("This is the profile",props);
  const openFollowers = () => {
      setFollowerModal(true);
  }

  const closeFollowers = () => {
    setFollowerModal(false);
  }

  const openFollowing = () => {
    setFollowingModal(true);
}

const closeFollowing = () => {
  setFollowingModal(false);
}

  return (
    <div className={styles.containerStyle}>
      <div className={styles.imageContainerStyle}>
        <img
          width="10%"
          src={"....../public/photos/profile.png"}
          alt="Artist"
          className={styles.imageStyle}
        />
      </div>
      <div className={styles.textContainerStyle}>
        <div style={{margin: '5% 0'}}>
          <h2 className={styles.artistNameStyle}>{props.info.name}</h2>
        </div>
        <div style={{margin: '5% 0'}}>
          <p className={styles.gmailStyle}>{props.info.email}</p>
        </div>
        <div style={{margin: '5% 0'}}>
          <p className={styles.tokenNumberStyle}>{props.info.tokens} tokens</p>
        </div>
        <div style={{margin: '5% 0'}}>
        <div style={{margin: '5% 0'}}>
          <p className={styles.bioTextStyle}>{props.info.bio}</p>
        </div>
        <div style={{margin: '5% 0'}}></div>
        </div>
        <div className={styles.buttonContainerStyle}>
        <Button variant="contained" color= "secondary" onClick={openFollowers}> Followers </Button>
        <Button variant="contained" color= "secondary" onClick={openFollowing}> Following </Button>        
        </div>
          <IconButton aria-label="upload" size="large" color='secondary' onClick={()=>{router.push(`/artist/addauction/${props.info.userID}`)}}>
              <AddCircleRoundedIcon size="large"/>
            </IconButton>
      </div>

      <Dialog open={followerModal} onClose={closeFollowers}>
        <DialogTitle> Follower List</DialogTitle>
        <DialogContent>
          <FollowList list= {followers}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFollowers}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={followingModal} onClose={closeFollowing}>
        <DialogTitle> Following List</DialogTitle>
        <DialogContent>
          <FollowList list={follows}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFollowing}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
