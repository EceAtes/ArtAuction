import LoginPageForm from "@/components/LoginPage/LoginPageForm";
import styles from "../components/LoginPage/LoginPage.module.css";
import AddAuction from "@/pages/artist/addAuction/[userID]";
import AuctionView from "@/pages/artist/viewAuction/[userID]";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <AuctionView/>
      </div>
    </div>
  );
}
