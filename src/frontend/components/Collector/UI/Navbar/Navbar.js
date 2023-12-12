"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
// Import necessary modules
import { useNavigation, useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = (props) => {
  const navigation = useRouter();
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarName}>ArtAuctions</div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/collector/exhibitions/1" passHref legacyBehavior>
            <a className={styles.navLink}>Exhibitions</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Profile</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>
            <NotificationsIcon fontSize="small"></NotificationsIcon>
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>
              <LogoutIcon fontSize="small"></LogoutIcon>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
