import styles from "./AuctionList.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Modal = (props) => {
  const [exhibitionId, setExhibitionId] = useState("");
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [newExhibitionDescription, setNewExhibitionDescription] = useState("");

  const addToExhibitionHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalDiv}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={props.closeModal}>
            <CloseIcon fontSize="large"></CloseIcon>
          </button>
        </div>
        <h3 className={styles.modalHeader}>Add {props.auctionName} to Exhibition</h3>


        <form onSubmit={addToExhibitionHandler}>
          {props.availableExhibitions.map((exhibition) => (
            <div className={styles.radioWrapper}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  className={styles.radioInput}
                  name="exhibition"
                  value={exhibition.id}
                  /*checked={userType === "artist"}*/
                  onChange={(e) => setExhibitionId(e.target.value)}
                />
                {exhibition.title}
              </label>
            </div>
          ))}

          <div className={styles.radioWrapper}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                className={styles.radioInput}
                name="exhibition"
                value={-1}
                /*checked={userType === "artist"}*/
                onChange={(e) => setExhibitionId(e.target.value)}
              />
              {"Create New Exhibition"}
            </label>
          </div>

          {exhibitionId == -1 && (
            <>
              <input
                type="text"
                className={styles.exhibitionNameInput}
                id="newExhibitionName"
                name="newExhibitionName"
                placeholder="Exhibition Name"
                value={newExhibitionName}
                onChange={(e) => setNewExhibitionName(e.target.value)}
              />

              <textarea
                className={styles.exhibitionDescriptionInput}
                id="newExhibitionName"
                name="newExhibitionName"
                placeholder="Description"
                value={newExhibitionDescription}
                onChange={(e) => setNewExhibitionDescription(e.target.value)}
              />
            </>
          )}

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.addButton}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
