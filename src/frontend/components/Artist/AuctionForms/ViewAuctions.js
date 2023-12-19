import React from 'react';
import SearchEntry from '@/components/Collector/UI/SearchEntry/SearchEntry';
import AuctionList from '@/components/Collector/MainPage/Auctions/AuctionList';
import styles from "@/components/Collector/MainPage/CollectorMainPage.module.css";
import photo from '@/public/photos/yoongi.jpg';

export default function ViewMyAuctions() {  
  const my_auctions = [
    {
      id: 1,
      imageUrl: photo,
      auctionName: "Others Auction-1",
    },
  
    {
      id: 2,
      imageUrl:photo,
      auctionName: "Others Auction-2",
    },
  
    {
      id: 3,
      imageUrl: photo,
      auctionName: "Others Auction-3",
    },
  
    {
      id: 4,
      imageUrl: photo,
      auctionName: "Others Auction-4",
    },
    {
      id: 5,
      imageUrl: photo,
      auctionName: "Others Auction-5",
    },
  
    {
      id: 6,
      imageUrl: photo,
      auctionName: "Others Auction-6",
    },
  
    {
      id: 7,
      imageUrl: photo,
      auctionName: "Others Auction-7",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className = "AuctionDiv">
        <AuctionList  auctions={my_auctions} title={"Ended Auctions"} />
        <AuctionList auctions={my_auctions} title = {"Ongoing Auctions"}/>
        <AuctionList auctions={my_auctions} title = {"Sold Auctions"}/>
      </div>
    </div>
  );
}