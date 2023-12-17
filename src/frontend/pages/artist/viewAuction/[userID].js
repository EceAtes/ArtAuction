import React from 'react';
import Auction from '@/components/Artist/AuctionForms/Auction';
import Profile from "@/components/Artist/Profile/Profile"
const AuctionView = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: '0 0 20%', padding: '20px', borderRight: '1px solid #ccc' }}>
        <Profile />
      </div>

      <div style={{ flex: '1', padding: '20px' }}>
        <Auction />
      </div>
    </div>
  );
};

export default AuctionView;