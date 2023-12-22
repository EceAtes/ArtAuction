import React from "react";
import SearchEntry from "@/components/Collector/UI/SearchEntry/SearchEntry";
import AuctionList from "@/components/Artist/MainPage/Auctions/AuctionList";
import styles from "@/components/Collector/MainPage/CollectorMainPage.module.css";
import photo from "@/public/photos/yoongi.jpg";

export default function ViewMyAuctions(props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="AuctionDiv">
        {props.endedAuctions.length > 0 ? (
          <AuctionList
            auctions={props.endedAuctions}
            title={"Ended/Sold Auctions"}
          />
        ) : (
          <h2
            style={{
              fontSize: "2rem",
              marginTop: "10px",
            }}
          >
            No Ended Auctions
          </h2>
        )}
        {props.ongoingAuctions.length > 0 ? (
          <AuctionList
            auctions={props.ongoingAuctions}
            title={"Ongoing Auctions"}
          />
        ) : (
          <h2
            style={{
              fontSize: "2rem",
              marginTop: "10px",
            }}
          >
            No Ongoing Auctions
          </h2>
        )}
        {props.pastAuctions.length > 0 ? (
          <AuctionList auctions={props.pastAuctions} title={"Sold Auctions"} />
        ) : (
          <h2
            style={{
              fontSize: "2rem",
              marginTop: "10px",
            }}
          >
            No Past Auctions
          </h2>
        )}
        {props.notApprovedAuctions.length > 0 ? (
          <AuctionList
            auctions={props.notApprovedAuctions}
            title={"Not Approved Auctions"}
          />
        ) : (
          <h2
            style={{
              fontSize: "2rem",
              marginTop: "10px",
            }}
          >
            No NotApproved Auctions
          </h2>
        )}
      </div>
    </div>
  );
}