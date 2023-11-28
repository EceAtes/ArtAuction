import styles from "./SignUp.module.css";
import { useState } from "react";
const SignUpForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //api
  };

  return (
    <>
      <h1 className={styles.artAuctionHeader}>ArtAuctions</h1>
      <h3 className={styles.subtext}>Join Us!</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className={styles.formInput}
            id="name"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className={styles.radioWrapper}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              className={styles.radioInput}
              name="userType"
              value="artist"
              checked={userType === "artist"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Artist
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              className={styles.radioInput}
              name="userType"
              value="collector"
              checked={userType === "collector"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Collector
          </label>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.submitButton}>
            Create Account
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
