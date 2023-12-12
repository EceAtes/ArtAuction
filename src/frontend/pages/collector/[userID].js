import React from "react";
import SearchEntry from "@/components/Collector/UI/SearchEntry/SearchEntry";
import AuctionList from "@/components/Collector/MainPage/Auctions/AuctionList";
import Navbar from "@/components/Collector/UI/Navbar/Navbar";
import CollectorList from "../../components/Collector/MainPage/Collectors/CollectorList";
import styles from "../../components/Collector/MainPage/CollectorMainPage.module.css";
export default function CollectorMainPage() {
  const collectorsData = [
    {
      id: 1,
      name: "Collector 1",
      userType: "collector",
      profilePicture: "/photos/yoongi.jpg",
      description: "A passionate art collector.",
    },
    {
      id: 2,
      name: "Collector 2",
      userType: "collector",
      profilePicture: "/photos/yoongi.jpg",
      description: "Enthusiastic about rare artifacts.",
    },
    {
      id: 3,
      name: "Artist 1",
      userType: "artist",
      profilePicture: "/photos/yoongi.jpg",
      description: "Music is my number 1, but I like art too",
    },
    {
      id: 4,
      name: "Artist 2",
      userType: "artist",
      profilePicture: "/photos/yoongi.jpg",
      description: "Stream AGUST D",
    },
    {
      id: 5,
      name: "Artist 2",
      userType: "artist",
      profilePicture: "/photos/yoongi.jpg",
      description: "artist - tired by nature",
    },
  ];
  const auctions = [
    {
      id: 1,
      imageUrl: "/photos/loginpage.png",
      auctionName: "Others Auction-1",
    },

    {
      id: 2,
      imageUrl: "/photos/loginpage.png",
      auctionName: "Others Auction-2",
    },

    {
      id: 3,
      imageUrl: "/photos/loginpage.png",
      auctionName: "Others Auction-3",
    },

    {
      id: 4,
      imageUrl: "/photos/loginpage.png",
      auctionName: "Others Auction-4",
    },
    {
      id: 5,
      imageUrl: "/photos/loginpage.png",
      auctionName: "Others Auction-5",
    },

    {
      id: 6,
      imageUrl: "/photos/loginpage.png",
      auctionName: "Others Auction-6",
    },

    {
      id: 7,
      imageUrl: "/photos/loginpage.png",
      auctionName: "Others Auction-7",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <SearchEntry />
      <div className="AuctionDiv">
        <AuctionList
          auctions={auctions}
          title={"Auctions From People You Follow"}
        />
        <AuctionList auctions={auctions} title={"Popular Auctions"} />
        <AuctionList auctions={auctions} title={"Recent Auctions"} />
      </div>
      <div>
        <CollectorList
          title="Top Collectors"
          collectors={collectorsData.filter(
            (collector) => collector.userType === "collector"
          )}
        />
      </div>
      <CollectorList
        title="Top Artists"
        collectors={collectorsData.filter(
          (artist) => artist.userType === "artist"
        )}
      />
    </main>
  );
}
