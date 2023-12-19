import LoginPageForm from "@/components/LoginPage/LoginPageForm";
/*import styles from "../components/LoginPage/LoginPage.module.css";*/
import styles from "@/components/Artist/Profile/AuctionProposeList.module.css"
import AddAuction from "@/pages/artist/addauction/[userID]";
import AuctionView from "@/pages/artist/profile/[userID]";
import ListMyArtWork from "@/pages/artist/myartworks/[userID]"
import ArtistMainPage from "./artist/[userID]";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <ArtistMainPage/>
      </div>
    </div>
  );
}
