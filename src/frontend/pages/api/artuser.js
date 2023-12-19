import { API_ART_USER_FILTER_PEOPLE } from "./base";

//REMOVE AUCTION FROM EXHIBITION
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
