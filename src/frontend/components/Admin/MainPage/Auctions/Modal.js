import {
  adminAddAuctionMenuApiFunction,
  adminAddAuctionToExhibitionApiFunction,
  adminCreateExhibitionApiFunction,
  adminRemoveAuctionFromExhibitionApiFunction,
} from "@/pages/api/admin";
import styles from "./AuctionList.module.css";
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
  const submitHandler = (event) => {
    // first time add
    console.log(oldExhibitionId);
    if (oldExhibitionId == null) {
      if (exhibitionId == -1) {
        const admin_id = parseInt(localStorage.getItem("userID"), 10);
        const auction_id = parseInt(props.auctionID, 10);
        adminCreateExhibitionApiFunction(
          admin_id,
          newExhibitionName,
          newExhibitionDescription,
          auction_id
        )
          .catch((error) => {
            console.error("Highlight failed", error.message || error);
          })
          .finally(() => {
            props.closeModal();
          });
      } else {
        const auctionID = parseInt(props.auctionID, 10);

        console.log(auctionID, exhibitionId);
        adminAddAuctionToExhibitionApiFunction(exhibitionId, auctionID)
          .catch((error) => {
            console.error("Highlight failed", error.message || error);
          })
          .finally(() => {
            props.closeModal();
          });
      }
    } else {
      // second time, first remove then add
      const auctionID = parseInt(props.auctionID, 10);
      adminRemoveAuctionFromExhibitionApiFunction(oldExhibitionId, auctionID)
        .then(() => {
          if (exhibitionId == -1) {
            const admin_id = parseInt(localStorage.getItem("userID"), 10);
            const auction_id = parseInt(props.auctionID, 10);
            adminCreateExhibitionApiFunction(
              admin_id,
              newExhibitionName,
              newExhibitionDescription,
              auction_id
            )
              .catch((error) => {
                console.error("Highlight failed", error.message || error);
              })
              .finally(() => {
                props.closeModal();
              });
          } else {
            const auctionID = parseInt(props.auctionID, 10);

            console.log(auctionID, exhibitionId);
            adminAddAuctionToExhibitionApiFunction(exhibitionId, auctionID)
              .catch((error) => {
                console.error("Highlight failed", error.message || error);
              })
              .finally(() => {
                props.closeModal();
              });
          }
        })
        .catch((error) => {
          console.error("Removal failed", error.message || error);
        });
    }
  };

  //REMOVE
  const removeHandler = () => {
    const auctionID = parseInt(props.auctionID, 10);
    adminRemoveAuctionFromExhibitionApiFunction(oldExhibitionId, auctionID)
      .catch((error) => {
        console.error("Highlight failed", error.message || error);
      })
      .finally(() => {
        props.closeModal();
      });
  };

  useEffect(() => {
    adminAddAuctionMenuApiFunction(props.auctionID)
      .then((data) => {
        console.log("auction modal menu successful ", data);
        setExhibitions(data);

        data.forEach((exhibition) => {
          if (exhibition.hasTheAuctionAsked) {
            setOldExhibitionId(exhibition.exhibitionID);
            setOldExhibitionName(exhibition.exhibitionName);
          }
        });

        console.log(data);
      })
      .catch((error) => {
        console.error("auction modal menu failed", error);
      });
  }, []);

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
