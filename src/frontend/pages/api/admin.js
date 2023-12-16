import { API_ADMIN_HOME, API_ADMIN_HIGHLIGHT_ARTUSER, API_ADMIN_HIGHLIGHT_AUCTION } from "./base";

//HOME
export const adminHomeApiFunction = async () => {
  const res = await fetch(API_ADMIN_HOME, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("home failed!");
  }
};

//HIGHLIGHT ART USER
export const adminHighlightArtUserApiFunction = async (
  admin_id,
  artuser_id
) => {
  const res = await fetch(API_ADMIN_HIGHLIGHT_ARTUSER, {
    method: "PATCH",
    body: JSON.stringify({ admin_id, artuser_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("highlight failed!");
  }
};

//HIGHLIGHT AUCTION
export const adminHighlightAuctionApiFunction = async (
  admin_id,
  auction_id
) => {
  const res = await fetch(API_ADMIN_HIGHLIGHT_AUCTION, {
    method: "PATCH",
    body: JSON.stringify({ admin_id, auction_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("highlight failed!");
  }
};