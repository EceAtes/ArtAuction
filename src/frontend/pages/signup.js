import SignUpForm from "@/components/SignUpPage/SignUpForm";
import styles from "../components/SignUpPage/SignUp.module.css";

const SignUpPage = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <SignUpForm />
      </div>

      <div className={styles.imageWrapper}>
        <img
          src="/photos/signuppage.png"
          alt="sign up"
          className={styles.signupImage}
        />
      </div>
      <div className={styles.footerWrapper}>
        <img
          src="/photos/signup-footer.png"
          alt="sign up"
          className={styles.signupFooterImage}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
