import { API_AUCTION_GET_ONGOING_AUCTIONS, API_AUCTION_GET_PAST_AUCTIONS, API_AUCTION_GET_POPULAR_AUCTIONS, API_AUCTION_GET_RECENT_AUCTIONS, API_AUCTION_GET_SAVED_AUCTIONS, API_AUCTION_GET_SINGLE_AUCTION } from "./base";

//GET SINGLE AUCTION
export const auctionGetSingleAuctionApiFunction = async (auctionID) => {
  const res = await fetch(API_AUCTION_GET_SINGLE_AUCTION + auctionID, {
    method: "PATCH",
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

//GET POPULAR AUCTIONS
export const auctionGetPopularAuctionsApiFunction = async () => {
  const res = await fetch(API_AUCTION_GET_POPULAR_AUCTIONS, {
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

//GET RECENT AUCTIONS
export const auctionGetRecentAuctionsApiFunction = async () => {
  const res = await fetch(API_AUCTION_GET_RECENT_AUCTIONS, {
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

