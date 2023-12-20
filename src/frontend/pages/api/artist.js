import {
  API_ARTIST_ARTISTINFO,
  API_ARTIST_GET_ENDED_AUCTIONS,
  API_ARTIST_NOT_APPROVED_AUCTIONS,
  API_ARTIST_ONGOING_AUCTIONS,
  API_ARTIST_PAST_AUCTIONS,
} from "./base";

//ARTIST INFO
export const artistGetArtistInfoApiFunction = async (userID) => {
  const res = await fetch(API_ARTIST_ARTISTINFO, {
    method: "PATCH",
    body: JSON.stringify({ userID }),
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

//GET ENDED AUCTIONS
export const artistGetEndedAuctionsApiFunction = async (userID) => {
  const res = await fetch(API_ARTIST_GET_ENDED_AUCTIONS + userID, {
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

//GET notApprovedAuctions AUCTIONS
export const artistGetNotApprovedAuctionsApiFunction = async (userID) => {
  const res = await fetch(API_ARTIST_NOT_APPROVED_AUCTIONS + userID, {
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

//GET ongoingAuctions AUCTIONS
export const artistGetOngoingAuctionsApiFunction = async (userID) => {
  const res = await fetch(API_ARTIST_ONGOING_AUCTIONS + userID, {
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

//GET pastAuctions AUCTIONS
export const artistGetPastAuctionsApiFunction = async (userID) => {
  const res = await fetch(API_ARTIST_PAST_AUCTIONS + userID, {
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