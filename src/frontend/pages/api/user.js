import { API_SIGN_UP } from "./base";

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
