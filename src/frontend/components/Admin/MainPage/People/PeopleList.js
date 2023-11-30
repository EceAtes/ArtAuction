import Person from "./Person";
import styles from "./PeopleList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";

const people = [
  {
    id: 1,
    name: "Test ABC",
    type: "Collector",
    description: "you change your mind like a girl changes clothes",
    imageUrl: "/photos/loginpage.png",
  },

  {
    id: 2,
    name: "Test ABC",
    type: "Artist",
    description: "you change your mind like a girl changes clothes",
    imageUrl: "/photos/loginpage.png",
  },
  {
    id: 3,
    name: "Test ABC",
    type: "Artist",
    description: "you change your mind like a girl changes clothes",
    imageUrl: "/photos/signuppage.png",
  },
  {
    id: 4,
    name: "Test ABC",
    type: "Collector",
    description: "you change your mind like a girl changes clothes",
    imageUrl: "/photos/loginpage.png",
  },
  {
    id: 5,
    name: "Test ABC",
    type: "Artist",
    description: "you change your mind like a girl changes clothes",
    imageUrl: "/photos/signuppage.png",
  },
  {
    id: 6,
    name: "Test ABC",
    type: "Artist",
    description: "you change your mind like a girl changes clothes",
    imageUrl: "/photos/loginpage.png",
  },
];

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
        {people.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            type={person.type}
            imageUrl={person.imageUrl}
            description={person.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
