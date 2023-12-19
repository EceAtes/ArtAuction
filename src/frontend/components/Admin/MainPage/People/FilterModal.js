import { useState } from "react";
import styles from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";

const FilterModal = (props) => {
  const [country, setCountry] = useState("Any");
  const [userType, setUserType] = useState("Any");

  const submitHandler = (event) => {
    event.preventDefault();
    props.submitHandler(event, country, userType);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalDiv}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={props.closeModal}>
            <CloseIcon fontSize="large"></CloseIcon>
          </button>
        </div>
        <h3 className={styles.modalHeader}>Filter The People</h3>

        <form onSubmit={submitHandler}>
          <h4 className={styles.modalHeader2}>User Type</h4>
          <div className={styles.radioWrapper} key={1}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice1"
                value={"Any"}
                checked={userType == "Any"}
                onChange={(e) => setUserType(e.target.value)}
              />
              {"Any"}
            </label>
          </div>
          <div className={styles.radioWrapper} key={2}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice2"
                value={"Artist"}
                checked={userType == "Artist"}
                onChange={(e) => setUserType(e.target.value)}
              />
              {"Artist"}
            </label>
          </div>
          <div className={styles.radioWrapper} key={3}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice3"
                value={"Collector"}
                checked={userType == "Collector"}
                onChange={(e) => setUserType(e.target.value)}
              />
              {"Collector"}
            </label>
          </div>

          <h4 className={styles.modalHeader3}>Country</h4>
          <div className={styles.radioWrapper} key={4}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice4"
                value={"Any"}
                checked={country == "Any"}
                onChange={(e) => setCountry(e.target.value)}
              />
              {"Any"}
            </label>
          </div>

          <input
            type="text"
            className={styles.exhibitionNameInput}
            placeholder="Custom Country"
            onChange={(e) => setCountry(e.target.value)}
          />

          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              className={styles.addButton}
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
