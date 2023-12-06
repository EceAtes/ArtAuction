import styles from "./AuctionList.module.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import Modal from "./Modal";
import { useState } from "react";

const Auction = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    if (isModalOpen) {
      event.preventDefault();
      setModalOpen(false);
    } else {
      event.preventDefault();
      setModalOpen(true);
    }
  };

  const handleCloseModal = (event) => {
    event.preventDefault();

    setModalOpen(false);
  };

  return (
    <div className={styles.auctionContainer}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Auction" />
        <div className={styles.starsContainer}>
          <button className={styles.auctionFilterButton}>
            <StarBorderIcon fontSize="large"></StarBorderIcon>
          </button>
          <button
            className={styles.auctionFilterButton}
            onClick={handleOpenModal}
          >
            <BlurOnIcon fontSize="large"></BlurOnIcon>
          </button>
        </div>
      </div>
      <h3 className={styles.auctionHeader}>{props.auctionName}</h3>
      <button className={styles.moreButton}>More</button>

      {isModalOpen && (
        <Modal
          availableExhibitions={props.availableExhibitions}
          id={props.id}
          closeModal={handleCloseModal}
          auctionName={props.auctionName}
        ></Modal>
      )}
    </div>
  );
};

export default Auction;
