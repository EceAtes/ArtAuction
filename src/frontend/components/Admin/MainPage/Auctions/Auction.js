import styles from "./AuctionList.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import Modal from "./Modal";
import { useState } from "react";
import { capitalize } from "@mui/material";
import { adminHighlightAuctionApiFunction } from "@/pages/api/admin";
import Link from "next/link";

const Auction = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleOpenModal = (event) => {
    if (isModalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
        <div className={styles.starsContainer}>
          <button
            className={styles.auctionFilterButton}
            onClick={handleHighlightAuction}
          >
            {isHighlighted ? (
              <StarIcon fontSize="large"></StarIcon>
            ) : (
              <StarBorderIcon fontSize="large"></StarBorderIcon>
            )}
          </button>
          <button
            className={styles.auctionFilterButton}
            onClick={handleOpenModal}
          >
            <BlurOnIcon fontSize="large"></BlurOnIcon>
          </button>
        </div>
      </div>
      <h3 className={styles.auctionHeader}>{capitalize(props.title)}</h3>
      <Link
        href={`/admin/information/auctioninfo/${props.auctionID}`}
        passHref
        legacyBehavior
      >
        <button className={styles.moreButton}>More</button>
      </Link>

      {isModalOpen && (
        <Modal
          key={props.auctionID}
          auctionID={props.auctionID}
          closeModal={handleCloseModal}
          title={props.title}
        ></Modal>
      )}
    </div>
  );
};

export default Auction;
