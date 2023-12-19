import { capitalize } from "@mui/material";
import styles from "./EditorPick.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
import {
  adminHighlightArtUserApiFunction,
  adminHighlightAuctionApiFunction,
} from "@/pages/api/admin";
import Link from "next/link";

const EditorPick = (props) => {
  if (props.type == "auction") {
    const [isHighlighted, setIsHighlighted] = useState(
      props.highlighterAdminID == null ? false : true
    );

    const handleHighlightAuction = (event) => {
      event.preventDefault();

      const admin_id = parseInt(localStorage.getItem("userID"), 10);
      const auction_id = parseInt(props.auctionID, 10);
      console.log(admin_id, auction_id);
      adminHighlightAuctionApiFunction(admin_id, auction_id)
        .catch((error) => {
          console.error("Highlight failed", error.message || error);
        })
        .finally(() => {
          setIsHighlighted(!isHighlighted);
        });
    };

    return (
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
          <button
            className={styles.starButton}
            onClick={handleHighlightAuction}
          >
            {isHighlighted ? (
              <StarIcon fontSize="large" className={styles.starIcon}></StarIcon>
            ) : (
              <StarBorderIcon
                fontSize="large"
                className={styles.starIcon}
              ></StarBorderIcon>
            )}
          </button>
          <Link
            href={`/admin/information/auctioninfo/${props.auctionID}`}
            passHref
            legacyBehavior
          >
            <button className={styles.moreButton}>More</button>
          </Link>
        </div>
      </div>
    );
  } else {
    const [isHighlighted, setIsHighlighted] = useState(
      props.highlighterAdminID == null ? false : true
    );

    const handleHighlightArtUser = (event) => {
      event.preventDefault();

      const admin_id = parseInt(localStorage.getItem("userID"), 10);
      const artuser_id = parseInt(props.userID, 10);
      console.log(admin_id, artuser_id);
      adminHighlightArtUserApiFunction(admin_id, artuser_id)
        .catch((error) => {
          console.error("Highlight failed", error.message || error);
        })
        .finally(() => {
          setIsHighlighted(!isHighlighted);
        });
    };

    return (
      <div className={styles.editorPickContainer}>
        <div className={styles.imageContainer}>
          <img src={props.imageUrl} alt="User Image" />
        </div>

        <div className={styles.detailsContainer}>
          <h3 className={styles.personNameTitle}>{capitalize(props.name)}</h3>
          <h3 className={styles.personType}>{capitalize(props.role)}</h3>
          <p className={styles.editorPickDescription}>{props.bio}</p>
        </div>

        <div className={styles.starAndButtonContainer}>
          <button
            className={styles.starButton}
            onClick={handleHighlightArtUser}
          >
            {isHighlighted ? (
              <StarIcon fontSize="large" className={styles.starIcon}></StarIcon>
            ) : (
              <StarBorderIcon
                fontSize="large"
                className={styles.starIcon}
              ></StarBorderIcon>
            )}
          </button>

          <button className={styles.moreButton}>More</button>
        </div>
      </div>
    );
  }
};

export default EditorPick;
