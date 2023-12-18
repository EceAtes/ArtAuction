import { useState } from "react";
import styles from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";

const SortModal = (props) => {
  const [choice, setChoice] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    props.submitHandler(event,choice);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalDiv}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={props.closeModal}>
            <CloseIcon fontSize="large"></CloseIcon>
          </button>
        </div>
        <h3 className={styles.modalHeader}>Sort The Auctions</h3>

        <form onSubmit={submitHandler}>
          <div className={styles.radioWrapper} key={1}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice1"
                value={1}
                onChange={(e) => setChoice(e.target.value)}
              />
              {"Name Ascending"}
            </label>
          </div>
          <div className={styles.radioWrapper} key={2}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice2"
                value={2}
                onChange={(e) => setChoice(e.target.value)}
              />
              {"Name Descending"}
            </label>
          </div>
          <div className={styles.radioWrapper} key={3}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice3"
                value={3}
                onChange={(e) => setChoice(e.target.value)}
              />
              {"Date Ascending"}
            </label>
          </div>
          <div className={styles.radioWrapper} key={4}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="choice4"
                value={4}
                onChange={(e) => setChoice(e.target.value)}
              />
              {"Date Descending"}
            </label>
          </div>

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

export default SortModal;
