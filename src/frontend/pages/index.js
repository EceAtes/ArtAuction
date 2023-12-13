import LoginPageForm from "@/components/LoginPage/LoginPageForm";
import styles from "../components/LoginPage/LoginPage.module.css";
import EditAuction from "@/components/Artist/AuctionEdit";
import Profile from "@/components/Artist/Profile";
//import AuctionList from "@/components/Admin/MainPage/Auctions/AuctionList";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <EditAuction></EditAuction>
      </div>
    </div>
  );
}
