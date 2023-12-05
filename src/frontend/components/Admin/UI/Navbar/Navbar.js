import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
const Navbar = (props) => {
  const router = useRouter();
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarName}>ArtAuctions</div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/admin/1" passHref legacyBehavior>
            <a className={styles.navLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin/exhibitions/1" passHref legacyBehavior> 
            <a className={styles.navLink}>Exhibitions</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Proposals</a>
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
