import React from "react";
import { useState, useEffect } from "react";
import styles from "./AuctionEdit.module.css";
import { Button } from "@mui/material";
//import API for auction post
import { artistPostNewAuctionApiFunction } from "@/pages/api/auction";
import { useRouter } from "next/router";

const EditAuction = () => {
  const router = useRouter();

  const [image, setImage] = useState([]);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Painting");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minBidAmount, setMinBidAmount] = useState("");
  const [bidIncrement, setBidIncrement] = useState("");
  const [description, setDescription] = useState("");

  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedRole = localStorage.getItem("role");
    if (storedUserID && storedRole) {
      setUserID(storedUserID);
      setRole(storedRole);
    }
  }, []);

  function saveClick() {
    const newAuction = {
      title: itemName,
      uploaded_by_artist_ID: userID,
      type: category,
      size: width,
      creationDate: startDate,
      description: description,
      endDate: endDate,
      minimumBidIncrease: bidIncrement,
      baseBid: minBidAmount,
    };

    console.log(newAuction);
    artistPostNewAuctionApiFunction(newAuction)
      .catch((error) => {
        console.error("Admin proposed auctions failed", error.message);
      })
      .finally(() => {
        router.push(`/${role}/myartworks/${userID}`);
      });

    //Go to my artworks
  }

  return (
    <div className={styles.EditAuction}>
      <h1 className={styles.EditAuction}>Create Auction</h1>
      <div style={{ margin: "30px 0" }}>
        <input
          type="file"
          id="upload"
          accept=".png"
          onClick={(e) => setImage(e.target.files[0])}
          style={{ display: "none" }}
        />
        <label
          for="upload"
          style={{
            display: "inline-block",
            backgroundColor: "purple",
            color: "white",
            padding: "0.5rem",
            fontFamily: "sans-serif",
            borderRadius: "0.3rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Upload Artwork
        </label>
        <></>
        <span>No file chosen.</span>
      </div>

      <form className={styles.EditAuction}>
        <div className={styles.EditAuction}>
          <label className={styles.EditAuction} htmlFor="itemName">
            Artwork Name:
          </label>
          <input
            className={styles.EditAuction}
            type="text"
            id="itemName"
            name="itemName"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div>
          <label className={styles.EditAuction} htmlFor="category">
            Category:
          </label>
          <select
            className={styles.EditAuction}
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Add your category options here */}
            <option className={styles.EditAuction} value="category1">
              Painting
            </option>
            <option className={styles.EditAuction} value="category2">
              Sculpture
            </option>
            <option className={styles.EditAuction} value="category3">
              Photography
            </option>
            <option className={styles.EditAuction} value="category4">
              Print
            </option>
            <option className={styles.EditAuction} value="category5">
              Collage
            </option>
            <option className={styles.EditAuction} value="category6">
              Mied Media
            </option>
            <option className={styles.EditAuction} value="category7">
              Print Making
            </option>
            <option className={styles.EditAuction} value="category8">
              Drawig
            </option>
            <option className={styles.EditAuction} value="category9">
              Ceramics
            </option>
            <option className={styles.EditAuction} value="category10">
              Digital Art
            </option>
            <option className={styles.EditAuction} value="category11">
              Other
            </option>
          </select>

          <label className={styles.EditAuction} htmlFor="priority">
            Width:
          </label>
          <input
            className={styles.EditAuction}
            type="number"
            id="min-bid"
            name="min-bid"
            onChange={(e) => setWidth(e.target.value)}
          />

          <label className={styles.EditAuction} htmlFor="priority">
            Length:
          </label>
          <input
            className={styles.EditAuction}
            type="number"
            id="min-bid"
            name="min-bid"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className={styles.EditAuction}>
          <label className={styles.EditAuction} htmlFor="endDate">
            Start Date:
          </label>
          <input
            className={styles.EditAuction}
            type="date"
            id="endDate"
            name="endDate"
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className={styles.EditAuction} htmlFor="endDate">
            End Date:
          </label>
          <input
            className={styles.EditAuction}
            type="date"
            id="endDate"
            name="endDate"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <label className={styles.EditAuction} htmlFor="priority">
            Minimum Bid Amound:
          </label>
          <input
            className={styles.EditAuction}
            type="number"
            id="min-bid"
            name="min-bid"
            onChange={(e) => setMinBidAmount(e.target.value)}
          />

          <label className={styles.EditAuction} htmlFor="bidIncrement">
            Bid Increment:
          </label>
          <input
            className={styles.EditAuction}
            type="number"
            id="bidIncrement"
            name="bidIncrement"
            onChange={(e) => setBidIncrement(e.target.value)}
          />
        </div>

        <div className={styles.EditAuction}>
          <label className={styles.EditAuction} htmlFor="description">
            Description:
          </label>
          <textarea
            className={styles.EditAuction}
            id="description"
            name="description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => saveClick()}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditAuction;
