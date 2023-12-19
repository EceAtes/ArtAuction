import Person from "./Person";
import styles from "./PeopleList.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import SortModal from "./SortModal";
import FilterModal from "./FilterModal";
import { artUserFilterPeopleApiFunction } from "@/pages/api/artuser";

const PeopleList = (props) => {
  const [artUsers, setArtUsers] = useState(props.artUsers);
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false); //havent done

  const handleSortModalOpen = (event) => {
    event.preventDefault();
    setSortModalOpen(!isSortModalOpen);
  };

  const handleFilterModalOpen = (event) => {
    event.preventDefault();
    setFilterModalOpen(!isFilterModalOpen);
  };

  const handleSortModalClose = () => {
    setSortModalOpen(false);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleSortFunction = (event, choice) => {
    event.preventDefault();
    let sortedArtUsers = [...artUsers];

    switch (choice) {
      case "1": // Name Ascending
        sortedArtUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "2": // Name Descending
        sortedArtUsers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "3": // Token Ascending
        sortedArtUsers.sort((a, b) => a.tokens - b.tokens);
        break;
      case "4": // Token Descending
        sortedArtUsers.sort((a, b) => b.tokens - a.tokens);
        break;
    }

    setArtUsers(sortedArtUsers);
    setSortModalOpen(false);
  };

  const handleFilterFunction = (event, country, user_type) => {
    event.preventDefault();
    console.log(country, user_type);
    artUserFilterPeopleApiFunction(country, user_type)
      .then((data) => {
        console.log("Filter successful ", data);
        setArtUsers(data);
        setFilterModalOpen(false);
      })
      .catch((error) => {
        console.error("Filter failed", error);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>People</h1>
        <button className={styles.filterButton} onClick={handleFilterModalOpen}>
          <TuneIcon fontSize="medium"></TuneIcon>
        </button>
        <button className={styles.filterButton} onClick={handleSortModalOpen}>
          <FilterListIcon fontSize="medium"></FilterListIcon>
        </button>
      </div>

      <div className={styles.peopleListContainer}>
        {artUsers.map((person) => (
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

      {isSortModalOpen && (
        <SortModal
          closeModal={handleSortModalClose}
          submitHandler={handleSortFunction}
        ></SortModal>
      )}

      {isFilterModalOpen && (
        <FilterModal
          closeModal={handleFilterModalClose}
          submitHandler={handleFilterFunction}
        ></FilterModal>
      )}
    </div>
  );
};

export default PeopleList;
