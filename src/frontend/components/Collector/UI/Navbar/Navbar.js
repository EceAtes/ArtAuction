"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
// Import necessary modules
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = (props) => {
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedRole = localStorage.getItem("role");

    if (storedUserID && storedRole) {
      setUserID(storedUserID);
      setRole(storedRole);
    }
  }, []);

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
        {/* NEED TO BE CHANGED
        <li className={styles.navItem}>
          <Link href={`/${role}/profile/${userID}`} passHref legacyBehavior>
            <a className={styles.navLink}>Profile</a>
          </Link>
        </li> */}
        
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
