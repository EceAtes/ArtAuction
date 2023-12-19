import {
  API_EDITOR_PICKS_HIGHLIGHTED_ARTUSERS,
  API_EDITOR_PICKS_HIGHLIGHTED_AUCTIONS,
  API_EDITOR_PICKS_EXHIBITIONS,
} from "./base";

//HIGHLIGHTED ART USERS
export const editorPicksHighlightedArtUsersApiFunction = async () => {
  const res = await fetch(API_EDITOR_PICKS_HIGHLIGHTED_ARTUSERS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("highlighted users failed!");
  }
};

//HIGHLIGHTED AUCTIONS
export const editorPicksHighlightedAuctionsApiFunction = async () => {
  const res = await fetch(API_EDITOR_PICKS_HIGHLIGHTED_AUCTIONS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("highlighted auctions failed!");
  }
};

//EXHIBITIONS
export const editorsPicksExhibitionsApiFunction = async () => {
    const res = await fetch(API_EDITOR_PICKS_EXHIBITIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("highlighted auctions failed!");
    }
  };
