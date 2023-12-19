import styles from "./SignUp.module.css";
import { useState } from "react";
import { signUpApiFunction } from "@/pages/api/user";
import AlertModal from "./AlertModal";
import { useRouter } from "next/router";

const SignUpForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("artist");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailureModalVisible, setIsFailureModalVisible] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log(name, email, password, userRole);

    signUpApiFunction(name, email, password, userRole)
      .then((data) => {
        console.log("Signup successful ", data);
        setIsSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error("Signup failed", error);
        setIsFailureModalVisible(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeSuccessModal = () => {
    router.push('/'); // Navigate to the main page

  };

  const closeErrorModal = () => {
    setIsSuccessModalVisible(false);
    setIsFailureModalVisible(false);
    setName("");
    setEmail("");
    setPassword("");
    setUserRole("artist");
    setIsLoading(false);
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
              checked={userRole === "artist"}
              onChange={(e) => setUserRole(e.target.value)}
            />
            Artist
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              className={styles.radioInput}
              name="userType"
              value="collector"
              checked={userRole === "collector"}
              onChange={(e) => setUserRole(e.target.value)}
            />
            Collector
          </label>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.submitButton}>
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </div>
      </form>
      {isSuccessModalVisible && (
        <AlertModal
          message="User Created Successfully"
          onClose={closeSuccessModal}
        />
      )}

      {isFailureModalVisible && (
        <AlertModal
          message="There was an issue creating the user. Please try again later."
          onClose={closeErrorModal}
        />
      )}
    </>
  );
};

export default SignUpForm;
