import LoginPageForm from "@/components/LoginPage/LoginPageForm";
import styles from "../components/LoginPage/LoginPage.module.css";
import EditAuction from "@/components/Artist/AuctionEdit";
import Profile from "@/components/Artist/Profile";
import addAuction from "@/pages/artist/addAuction/[userID]";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
      <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: '0 0 30%', padding: '20px', borderRight: '1px solid #ccc' }}>
        <Profile />
      </div>

      <div style={{ flex: '1', padding: '20px' }}>
        <EditAuction />
      </div>
    </div>
      </div>
    </div>
  );
}
