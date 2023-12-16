import { adminHighlightArtUserApiFunction } from "@/pages/api/admin";
import styles from "./PeopleList.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { capitalize } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Person = (props) => {
  const [isHighlighted, setIsHighlighted] = useState(
    props.highlighterAdminID == null ? false : true
  );

  const handleHighlightArtUser = (event) => {
    event.preventDefault();

    const admin_id = parseInt(localStorage.getItem("userID"), 10);
    const artuser_id = parseInt(props.userID, 10);
    console.log(admin_id, artuser_id);
    adminHighlightArtUserApiFunction(admin_id, artuser_id)
      .catch((error) => {
        console.error("Highlight failed", error.message || error);
      })
      .finally(() => {
        setIsHighlighted(!isHighlighted);
      });
  };

  return (
    <div className={styles.personContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="User" />
        <div className={styles.starsContainer}>
          <button
            className={styles.personStarButton}
            onClick={handleHighlightArtUser}
          >
            {isHighlighted ? (
              <StarIcon fontSize="large"></StarIcon>
            ) : (
              <StarBorderIcon fontSize="large"></StarBorderIcon>
            )}
          </button>
        </div>
      </div>
      <h3 className={styles.nameHeader}>{capitalize(props.name)}</h3>
      <h2 className={styles.typeHeader}>{capitalize(props.role)}</h2>
      <div className={styles.descriptionContainer}>
        <p>{props.bio}</p>
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
