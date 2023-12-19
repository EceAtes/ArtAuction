import React from 'react';
import Profile from '@/components/Artist/Profile/Profile'
import EditAuction from '@/components/Artist/AuctionForms/AuctionEdit';
import Navbar from "@/components/Artist/UI/Navbar";
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";

const AddAuction = (props) => {
  return (
    <div>
      <Navbar/>
      <div className={styles.container}>
        <div style={{ display: 'flex', height: '70%', width: '100%'}}>
              <div style={{ flex: '0 0 30%', padding: '20px', borderRight: '1px solid #ccc' }}>
                <Profile />
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
