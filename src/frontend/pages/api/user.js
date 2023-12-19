import { API_SIGN_IN, API_SIGN_UP, API_VERIFY_SALE } from "./base";

export const signUpApiFunction = async (name, email, password, role) => {
  const res = await fetch(API_SIGN_UP, {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Signup failed!");
  }
};

export const signInApiFunction = async (email, password) => {
  const res = await fetch(API_SIGN_IN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Signin failed!");
  }
};

export const verifySaleApiFunction = async (
  userRole,
  userID,
  auctionID,
  decision
) => {
  const res = await fetch(API_VERIFY_SALE, {
    method: "PATCH",
    body: JSON.stringify({ userRole, userID, auctionID, decision }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Verify Sale failed!");
  }
};
