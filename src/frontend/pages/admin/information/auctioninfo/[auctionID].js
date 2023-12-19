import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import styles from "../../../../components/Admin/Information/AuctionInfo/AuctionInfo.module.css";
import AuctionInfo from "@/components/Admin/Information/AuctionInfo/Auction";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auctionGetSingleAuctionApiFunction } from "@/pages/api/auction";

const auctionInfoPage = (props) => {
  const [auction, setAuction] = useState(null);
  const router = useRouter();
  const { auctionID } = router.query;

  useEffect(() => {
    //console.log(auctionID);

    if (auctionID) {
      //console.log(auctionID);
      auctionGetSingleAuctionApiFunction(auctionID)
        .then((data) => {
          console.log("Auction details successful ", data);
          setAuction(data);
        })
        .catch((error) => {
          console.error("Auction details failed", error);
        });
    }
  }, [auctionID]);
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        {auction ? (
          <AuctionInfo
            auctionID={auction.auctionID}
            key={auction.auctionID}
            title={auction.title}
            imageUrl={"/photos/loginpage.png"}
            type={auction.type}
            size={auction.size}
            creationDate={auction.creationDate}
            auctionEndDate={auction.endDate}
            baseBid={auction.baseBid}
            minimumBidIncrease={auction.minimumBidIncrease}
            description={auction.description}
            artistId={auction.uploaded_by_artist_ID}
            artistName={auction.artistName}
            artistImageUrl={"/photos/signuppage.png"}
          ></AuctionInfo>
        ) : (
          <h2 className={styles.heading}>No Auction</h2>
        )}
      </div>
    </>
  );
};

export default auctionInfoPage;
