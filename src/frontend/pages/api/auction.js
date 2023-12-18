import { API_AUCTION_GET_SINGLE_AUCTION } from "./base";

//GET SINGLE AUCTION
export const auctionGetSingleAuctionApiFunction = async (auctionID) => {
  const res = await fetch(API_AUCTION_GET_SINGLE_AUCTION + auctionID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("auction failed!");
  }
};
