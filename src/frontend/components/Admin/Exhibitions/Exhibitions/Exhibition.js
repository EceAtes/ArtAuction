import styles from "./Exhibition.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExhibitionAuction from "./Auction";
import { useState } from "react";
import { adminEditExhibitionApiFunc } from "@/pages/api/admin";
import { useRouter } from "next/router";
const Exhibition = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [newExhibitionDescription, setNewExhibitionDescription] = useState("");

  const router = useRouter();
  const handleDelete = () => {
    props.onDelete(props.exhibitionID);
  };

  const handleEditMode = (event) => {
    event.preventDefault;
    setEditMode(!editMode);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const admin_id = parseInt(localStorage.getItem("userID"), 10);

    adminEditExhibitionApiFunc(
      props.exhibitionID,
      admin_id,
      newExhibitionName,
      newExhibitionDescription
    )
      .then((data) => {
        console.log("edit successful ", data);
      })
      .catch((error) => {
        console.error("edit failed", error);
      })
      .finally(() => {
        router.reload();
      });
  };

  return (
    <div className={styles.exhibitionContainer}>
      <div className={styles.exhibitionHeaderContainer}>
        <h3 className={styles.exhibitionHeader}>{props.title}</h3>
        <div className={styles.buttons}>
          <button className={styles.filterButton} onClick={handleEditMode}>
            <EditIcon fontSize="medium"></EditIcon>
          </button>
          <button className={styles.filterButton} onClick={handleDelete}>
            <DeleteIcon fontSize="medium"></DeleteIcon>
          </button>
        </div>
      </div>

      {!editMode && (
        <>
          {" "}
          <div className={styles.description}>
            <p>{props.description}</p>
          </div>
          <div className={styles.auctionListContainer}>
            {props.auctions.map((auction) => (
              <ExhibitionAuction
                key={auction.auctionID}
                auctionID={auction.auctionID}
                imageUrl={"/photos/loginpage.png"}
                auctionName={auction.title}
              />
            ))}
          </div>
        </>
      )}

      {editMode && (
        <>
          <form onSubmit={submitHandler} className={styles.formEdit}>
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
        </>
      )}
    </div>
  );
};

export default Exhibition;
