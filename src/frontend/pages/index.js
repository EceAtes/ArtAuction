import LoginPageForm from "@/components/LoginPage/LoginPageForm";
import styles from "../components/LoginPage/LoginPage.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <LoginPageForm></LoginPageForm>
      </div>
      <div className={styles.imageSection}>
        <img src="/photos/loginpage.png" alt="Login Page" />{" "}
      </div>
    </div>
  );
}
