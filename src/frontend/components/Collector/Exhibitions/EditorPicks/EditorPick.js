import { capitalize } from "@mui/material";
import styles from "./EditorPick.module.css";
import { useRouter } from "next/router";

const EditorPick = (props) => {
  
  const router = useRouter()
  const moreButtonHandler = (event) => {
  
    router.push(`/admin/information/auctioninfo/${props.auctionID}`);
  }
  if (props.type == "auction") {
    return (
      <>
        <div className={styles.editorPickContainer}>
          <div className={styles.imageContainer}>
            <img src={props.imageUrl} alt="Editor Pick" />
          </div>

          <div className={styles.detailsContainer}>
            <h3 className={styles.editorPickTitle}>{props.title}</h3>
            <h3 className={styles.auctionDescriptionTitle}>
              Auction Description
            </h3>
            <p className={styles.editorPickDescription}>{props.description}</p>
          </div>

          <div className={styles.moreButtonContainer}>
            <button className={styles.moreButton} onClick={moreButtonHandler}>More</button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.editorPickContainer}>
          <div className={styles.imageContainer}>
            <img src={props.imageUrl} alt="Editor Pick" />
          </div>

          <div className={styles.detailsContainer}>
            <h3 className={styles.personNameTitle}>{capitalize(props.name)}</h3>
            <h3 className={styles.personType}>{capitalize(props.role)}</h3>
            <p className={styles.editorPickDescription}>{props.bio}</p>
          </div>

          <div className={styles.seeProfileButtonContainer}>
            <button className={styles.moreButton}>See Profile</button>
          </div>
        </div>
      </>
    );
  }
};

export default EditorPick;
