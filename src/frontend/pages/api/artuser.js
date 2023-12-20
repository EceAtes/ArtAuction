import {
  API_ART_USER_AUCTIONS_FROM_PEOPLE_YOU_FOLLOW,
  API_ART_USER_FILTER_PEOPLE,
  API_ART_USER_SEARCH,
  API_ART_USER_TOP_ARTISTS,
  API_ART_USER_TOP_COLLECTORS,
} from "./base";

//FILTER PEOPLE
export const artUserFilterPeopleApiFunction = async (country, user_type) => {
  const res = await fetch(API_ART_USER_FILTER_PEOPLE, {
    method: "PATCH",
    body: JSON.stringify({ country, user_type }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("remove auction from exhibition failed!");
  }
};

//GET TOP COLLECTORS
export const artUsersGetTopCollectorsApiFunction = async () => {
  const res = await fetch(API_ART_USER_TOP_COLLECTORS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("get failed!");
  }
};

//GET TOP ARTISTS
export const artUsersGetTopArtistsApiFunction = async () => {
  const res = await fetch(API_ART_USER_TOP_ARTISTS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("get failed!");
  }
};

//AUCTIONS FROM PEOPLE YOU FOLLOW
export const artUserAuctionsFromPeopleApiFunction = async (userID) => {
  const res = await fetch(API_ART_USER_AUCTIONS_FROM_PEOPLE_YOU_FOLLOW, {
    method: "PATCH",
    body: JSON.stringify({ userID }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("get failed!");
  }
};

//SEARCH
export const artUserSearchApiFunction = async (search_key) => {
  const res = await fetch(API_ART_USER_SEARCH, {
    method: "PATCH",
    body: JSON.stringify({ search_key }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("get failed!");
  }
};
