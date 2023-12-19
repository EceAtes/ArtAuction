import { API_AUCTION_GET_ONGOING_AUCTIONS, API_AUCTION_GET_PAST_AUCTIONS, 
  API_AUCTION_GET_POPULAR_AUCTIONS, API_AUCTION_GET_RECENT_AUCTIONS, 
  API_AUCTION_GET_SAVED_AUCTIONS, API_AUCTION_GET_SINGLE_AUCTION, 
  API_AUCTION_CREATE, API_VERIFY_SALE, API_AUCTION_GET_ALL_BID_HISTORY } from "./base";

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

//POST new Auction
export const artistPostNewAuctionApiFunction = async (newAuction) => {
  console.log("I am here1", JSON.stringify( newAuction));
  const res = await fetch(API_AUCTION_CREATE, {
    method: "POST",
    body: JSON.stringify( newAuction ),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("add auction menu failed!");
  }
};

//VERIFY SALES
export const auctionaVerifySaleApiFunction = async (
  soldAuction
) => {
  console.log("Before patching", JSON.stringify(soldAuction));
  const res = await fetch(API_VERIFY_SALE, {
    method: "PATCH",
    body: JSON.stringify(soldAuction),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("sale verify failed!");
  }
};

//GET bid history of all auctions
export const auctionGetAllBidHistiory = async (id) => {
  const res = await fetch(API_AUCTION_GET_ALL_BID_HISTORY, {
    method: "PATCH",
    body: JSON.stringify({auctionID:id}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("auction bid history failed!");
  }
};
