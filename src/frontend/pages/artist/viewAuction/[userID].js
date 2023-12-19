import React from 'react';
import Auction from '@/components/Artist/AuctionForms/Auction';
import Profile from "@/components/Artist/Profile/Profile"
import Navbar from '@/components/Artist/UI/Navbar';
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";

const AuctionView = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: '0 0 20%', padding: '20px', borderRight: '1px solid #ccc' }}>
              <Profile />
            </div>

            <div style={{ flex: '1', padding: '20px' }}>
              <Auction />
            </div>
          </div>
      </div>
      
    </div>
  );
};

export default AuctionView;