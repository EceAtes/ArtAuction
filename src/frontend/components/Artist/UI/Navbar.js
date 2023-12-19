import Link from "next/link";
import styles from "@/components/Admin/UI/Navbar/Navbar.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
/*CHANGE THE ROUTERS*/

const Navbar = (props) => {
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

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
          <Link href={`/${role}/myartworks/${userID}`} passHref legacyBehavior>
            <a className={styles.navLink}>My ArtWork</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href={`/${role}/exhibitions/${userID}`} passHref legacyBehavior>
            <a className={styles.navLink}>Exhibitions</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href={`/${role}/profile/${userID}`} passHref legacyBehavior>
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
