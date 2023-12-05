import styles from "./EditorPick.module.css";
import StarIcon from "@mui/icons-material/Star";

const EditorPick = (props) => {
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

          <div className={styles.starAndButtonContainer}>
              <StarIcon className={styles.starIcon} />
            <button className={styles.moreButton}>More</button>
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
            <h3 className={styles.personNameTitle}>{props.title}</h3>
            <h3 className={styles.personType}>{props.type}</h3>
            <p className={styles.editorPickDescription}>{props.description}</p>
          </div>

          <div className={styles.starAndButtonContainer}>
              <StarIcon className={styles.starIcon} />

            <button className={styles.moreButton}>More</button>
          </div>
        </div>
      </>
    );
  }
};

export default EditorPick;
