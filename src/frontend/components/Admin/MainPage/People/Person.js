import styles from "./PeopleList.module.css";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";

const Person = (props) => {
  return (
    <div className={styles.personContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
        <div className={styles.starsContainer}>
          <button className={styles.personStarButton}>
            <StarIcon fontSize="large"></StarIcon>
          </button>
        </div>
      </div>
      <h3 className={styles.nameHeader}>{props.name}</h3>
      <h2 className={styles.typeHeader}>{props.type}</h2>
      <div className={styles.descriptionContainer}>
        <p>{props.description}</p>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/signup" passHref legacyBehavior>
          <a className={styles.linkToProfile}>See Profile</a>
        </Link>
      </div>
    </div>
  );
};

export default Person;
