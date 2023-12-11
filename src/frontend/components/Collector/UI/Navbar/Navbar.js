'use client'
import Link from "next/link";
import styles from "./Navbar.module.css";
// Import necessary modules
import { useNavigation, useRouter } from 'next/navigation';


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
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Exhibitions</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a
              className={styles.navLink}
            >
              Profile
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Notifications</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Logout</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;

