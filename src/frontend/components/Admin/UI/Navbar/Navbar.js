import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = (props) => {
  const router = useRouter();
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedRole = localStorage.getItem("role");

    if (storedUserID && storedRole) {
      setUserID(storedUserID);
      setRole(storedRole);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.clear();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarName}>ArtAuctions</div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href={`/${role}/${userID}`} passHref legacyBehavior>
            <a className={styles.navLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href={`/${role}/exhibitions/${userID}`} passHref legacyBehavior>
            <a className={styles.navLink}>Exhibitions</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href={`/${role}/proposals/${userID}`} passHref legacyBehavior>
            <a className={styles.navLink}>Proposals</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href={`/${role}/approve/${userID}`} passHref legacyBehavior>
            <a className={styles.navLink}>Approve</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>
              <NotificationsIcon fontSize="small"></NotificationsIcon>
            </a>
          </Link>
        </li>
        <li className={styles.navItem} onClick={handleLogout}>
          <a className={styles.navLink}>
            <LogoutIcon fontSize="small"></LogoutIcon>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
