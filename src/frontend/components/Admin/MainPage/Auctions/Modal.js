import {
  adminAddAuctionMenuApiFunction,
  adminAddAuctionToExhibitionApiFunction,
  adminCreateExhibitionApiFunction,
  adminRemoveAuctionFromExhibitionApiFunction,
} from "@/pages/api/admin";
import styles from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { capitalize } from "@mui/material";

const Modal = (props) => {
  const [exhibitionId, setExhibitionId] = useState();

  const [oldExhibitionId, setOldExhibitionId] = useState(null);
  const [oldExhibitionName, setOldExhibitionName] = useState(null);

  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [newExhibitionDescription, setNewExhibitionDescription] = useState("");

  const [exhibitions, setExhibitions] = useState([]);

  //ADD
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const adminId = parseInt(localStorage.getItem("userID"), 10);
      const auctionId = parseInt(props.auctionID, 10);

      if (oldExhibitionId !== null && exhibitionId !== oldExhibitionId) {
        await adminRemoveAuctionFromExhibitionApiFunction(
          oldExhibitionId,
          auctionId
        );
      }
      if (exhibitionId == -1) {
        console.log("Creating new exhibition");
        await adminCreateExhibitionApiFunction(
          adminId,
          newExhibitionName,
          newExhibitionDescription,
          auctionId
        );
      } else if (exhibitionId !== null) {
        console.log("Adding to existing exhibition");
        await adminAddAuctionToExhibitionApiFunction(exhibitionId, auctionId);
      }
    } catch (error) {
      console.error("Operation failed", error.message || error);
    } finally {
      props.closeModal();
      await fetchData();
    }
  };

  //REMOVE
  const removeHandler = async () => {
    try {
      const auctionId = parseInt(props.auctionID, 10);
      await adminRemoveAuctionFromExhibitionApiFunction(
        oldExhibitionId,
        auctionId
      );
    } catch (error) {
      console.error("Removal failed", error.message || error);
    } finally {
      props.closeModal();
      await fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await adminAddAuctionMenuApiFunction(props.auctionID);
      setExhibitions(data);

      const oldExhibition = data.find(
        (exhibition) => exhibition.hasTheAuctionAsked
      );
      if (oldExhibition) {
        setOldExhibitionId(oldExhibition.exhibitionID);
        setOldExhibitionName(oldExhibition.exhibitionName);
      } else {
        setOldExhibitionId(null);
        setOldExhibitionName(null);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalDiv}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={props.closeModal}>
            <CloseIcon fontSize="large"></CloseIcon>
          </button>
        </div>
        <h3 className={styles.modalHeader}>
          Add {capitalize(props.title)} to Exhibition
        </h3>

        <form onSubmit={submitHandler}>
          {exhibitions.map((exhibition) => (
            <div className={styles.radioWrapper} key={exhibition.exhibitionID}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  className={styles.radioInput}
                  name="exhibition"
                  value={exhibition.exhibitionID}
                  onChange={(e) => setExhibitionId(e.target.value)}
                />
                {exhibition.exhibitionName}
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
                required
                value={newExhibitionName}
                onChange={(e) => setNewExhibitionName(e.target.value)}
              />

              <textarea
                className={styles.exhibitionDescriptionInput}
                id="newExhibitionName"
                name="newExhibitionName"
                placeholder="Description"
                required
                value={newExhibitionDescription}
                onChange={(e) => setNewExhibitionDescription(e.target.value)}
              />
            </>
          )}

          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              className={styles.addButton}
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>

          {oldExhibitionId && (
            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                className={styles.removeButton}
                onClick={removeHandler}
              >
                Remove {capitalize(props.title)} from {oldExhibitionName}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
