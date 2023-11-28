import styles from "./LoginPage.module.css"
import { useState } from 'react';

const LoginPageForm = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        //api

    };

    return(<>
    <h1 className={styles.artAuctionHeader}>ArtAuctions</h1>
    <h3 className={styles.subtext}>Discover, bid, and own exquisite art pieces from around the world</h3>
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
      <button type="submit" className={styles.submitButton}>Login</button>
      <p className={styles.artAuctionText}>
        New to ArtAuctions? <a href="/signup" className={styles.linkToSignUp}>Create an account</a>
      </p>
    </form>
    </>)


};

export default LoginPageForm;
