import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signInApiFunction } from "@/pages/api/user";

const LoginPageForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log(email, password);
    signInApiFunction(email, password)
      .then((data) => {
        console.log("Signin successful ", data);
        localStorage.setItem("userID", data.userID);
        localStorage.setItem("role", data.role);
        router.push(`/${data.role}/${data.userID}`);
      })
      .catch((error) => {
        alert(error.message);
        console.error("Signin failed", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1 className={styles.artAuctionHeader}>ArtAuctions</h1>
      <h3 className={styles.subtext}>
        Discover, bid, and own exquisite art pieces from around the world
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            className={styles.formInput}
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            className={styles.formInput}
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p className={styles.artAuctionText}>
          New to ArtAuctions?{" "}
          <Link href="/signup" passHref legacyBehavior>
            <a className={styles.linkToSignUp}>Create an account</a>
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPageForm;
