import React from 'react';
import Auction from '@/components/Artist/AuctionForms/Auction';
import Profile from "@/components/Artist/Profile/Profile"
import Navbar from '@/components/Artist/UI/Navbar';
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import ViewMyAuctions from '@/components/Artist/AuctionForms/ViewAuctions';

const ListMyArtwork = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
          <ViewMyAuctions/>
      </div>
      
    </div>
  );
};

export default ListMyArtwork;