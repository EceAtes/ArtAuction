import {
  API_ADMIN_HOME,
  API_ADMIN_HIGHLIGHT_ARTUSER,
  API_ADMIN_HIGHLIGHT_AUCTION,
  API_ADMIN_ADD_AUCTION_MENU,
  API_ADMIN_CREATE_EXHIBITION,
  API_ADMIN_ADD_AUCTION_TO_EXHIBITION,
  API_ADMIN_REMOVE_AUCTION_FROM_EXHIBITION,
  API_ADMIN_DELETE_EXHIBITION,
  API_ADMIN_EDIT_EXHIBITION,
  API_ADMIN_PROPOSED_AUCTIONS,
} from "./base";

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
    return res.text();
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
    return res.text();
  } else {
    throw new Error("highlight failed!");
  }
};

//ADD AUCTION MENU
export const adminAddAuctionMenuApiFunction = async (auctionID) => {
  const res = await fetch(API_ADMIN_ADD_AUCTION_MENU, {
    method: "POST",
    body: JSON.stringify({ auctionID }),
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

//CREATE EXHIBITION
export const adminCreateExhibitionApiFunction = async (
  admin_id,
  title,
  description,
  auction_id
) => {
  const res = await fetch(API_ADMIN_CREATE_EXHIBITION, {
    method: "POST",
    body: JSON.stringify({ admin_id, title, description, auction_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("create exhibition failed!");
  }
};

//ADD AUCTION TO EXHIBITION
export const adminAddAuctionToExhibitionApiFunction = async (
  exhibitionID,
  auctionID
) => {
  const res = await fetch(API_ADMIN_ADD_AUCTION_TO_EXHIBITION, {
    method: "POST",
    body: JSON.stringify({ exhibitionID, auctionID }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("add auction to exhibition failed!");
  }
};

//REMOVE AUCTION FROM EXHIBITION
export const adminRemoveAuctionFromExhibitionApiFunction = async (
  exhibitionID,
  auctionID
) => {
  const res = await fetch(API_ADMIN_REMOVE_AUCTION_FROM_EXHIBITION, {
    method: "POST",
    body: JSON.stringify({ exhibitionID, auctionID }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("remove auction from exhibition failed!");
  }
};

//DELETE EXHIBITION
export const adminDeleteExhibitionApiFunc = async (exhibitionID) => {
  const res = await fetch(API_ADMIN_DELETE_EXHIBITION, {
    method: "POST",
    body: JSON.stringify({ exhibitionID }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("delete exhibition failed!");
  }
};

//EDIT EXHIBITION
export const adminEditExhibitionApiFunc = async (
  exhibitionID,
  admin_id,
  title,
  description
) => {
  const res = await fetch(API_ADMIN_EDIT_EXHIBITION, {
    method: "PATCH",
    body: JSON.stringify({ exhibitionID, admin_id, title, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("edit exhibition failed!");
  }
};

//PROPOSED AUCTIONS  
export const adminProposedAuctionsApiFunction = async () => {
  const res = await fetch(API_ADMIN_PROPOSED_AUCTIONS, {
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
