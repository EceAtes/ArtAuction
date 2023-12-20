import { API_ARTIST_GET_ENDED_AUCTIONS } from "./base";

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