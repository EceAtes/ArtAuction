import React from "react";
import styles from "./PeopleList.module.css"; // Import the CSS module
import { capitalize } from "@mui/material";
import Link from "next/link";

const Person = (props) => {
  return (
    <div className={styles.personContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="User" />
      </div>
      <h3 className={styles.nameHeader}>{capitalize(props.name)}</h3>
      <h2 className={styles.typeHeader}>{capitalize(props.role)}</h2>

      <div className={styles.descriptionContainer}>
        <p>{props.bio}</p>
      </div>
      <h2 className={styles.extraInformation}>
        {props.role == "artist"
          ? `Completed ${props.compAucCount} auctions`
          : `Won ${props.Wins} auctions`}
      </h2>
      <div className={styles.linkContainer}>
        <Link href="/signup" passHref legacyBehavior>
          <a className={styles.linkToProfile}>See Profile</a>
        </Link>
      </div>
    </div>
  );
};

export default Person;
