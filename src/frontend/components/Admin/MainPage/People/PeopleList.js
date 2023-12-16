import Person from "./Person";
import styles from "./PeopleList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";

const PeopleList = (props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>People</h1>
        <button className={styles.filterButton}>
          <TuneIcon fontSize="medium"></TuneIcon>
        </button>
        <button className={styles.filterButton}>
          <FilterListIcon fontSize="medium"></FilterListIcon>
        </button>
      </div>

      <div className={styles.peopleListContainer}>
        {props.artUsers.map((person) => (
          <Person
            key={person.userID}
            userID={person.userID}
            name={person.name}
            role={person.role}
            imageUrl={"/photos/signuppage.png"}
            highlighterAdminID={person.highlighter_adminID}
            bio={person.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
