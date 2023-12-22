import React, { useState } from "react";
import Person from "./Person";
import styles from "./PeopleList.module.css"; // Import the CSS module

const PeopleList = (props) => {
  const [peopleList, setPeopleList] = useState(props.peopleList);
  return (
    <div className={styles.collectorList}>
      <h2>{props.title}</h2>
      <div className={styles.peopleListContainer}>
        {peopleList.map((person) => (
          <Person
            key={person.userID}
            userID={person.userID}
            imageUrl={"/photos/signuppage.png"}
            name={person.name}
            role={person.role}
            Wins = {person.Wins}
            TotalBids = {person.TotalBids}
            bio={person.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
