import { API_ARTIST_ARTISTINFO, API_ARTIST_GET_ENDED_AUCTIONS } from "./base";

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
