import React from 'react';
import Profile from '@/components/Artist/Profile'
import EditAuction from '@/components/Artist/AuctionEdit';

const addAuction = (props) => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: '0 0 30%', padding: '20px', borderRight: '1px solid #ccc' }}>
        <Profile />
      </div>

      <div style={{ flex: '1', padding: '20px' }}>
        <EditAuction />
      </div>
    </div>
  );
};

export default addAuction;
