import React from 'react';
import Profile from '@/components/Artist/Profile/Profile'
import EditAuction from '@/components/Artist/AuctionForms/AuctionEdit';
import Navbar from "@/components/Artist/UI/Navbar";
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import { useState } from 'react';

/*const profile ={
  imageURL: "@/public/photos/profile.png",
  artistName: "Vincent Van Gogh",
  mail: "gogh@gmail.com",
  token:500,
  bio:"Hello I am Van Gogh",
  followers: [{id: 1, username: "Cezanne"}, {id:2, username:"Picasso"}],
  follows: [{id: 1, username: "Bansky"}, {id:2, username:"Michalengelo"}, {id:2, username:"DaVinci"}],
  artistID: 1
};*/

const [profile, setProfile]= useState();


useEffect(() => {
    artistGetProfile(userID)
    .then((data) => {
      console.log("Admin approve auctions success", data);
      setProfile(data);
    })
    .catch((error) => {
      console.error("Admin proposed auctions failed", error);
    });
}, []);

const AddAuction = () => {
  return (
    <div>
      <Navbar/>
      <div className={styles.container}>
        <div style={{ display: 'flex', height: '70%', width: '100%'}}>
              <div style={{ flex: '0 0 30%', padding: '20px', borderRight: '1px solid #ccc' }}>
                <Profile props={profile}/>
              </div>

              <div style={{ flex: '1', padding: '20px' }}>
                <EditAuction />
              </div>
        </div>
      </div>
    </div>
    
  );
};

export default AddAuction;