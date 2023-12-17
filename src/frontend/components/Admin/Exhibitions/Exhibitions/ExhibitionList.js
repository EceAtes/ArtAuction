import styles from "./Exhibition.module.css";
import Exhibition from "./Exhibition";
import { useState, useEffect } from "react";
import { adminDeleteExhibitionApiFunc } from "@/pages/api/admin";

const ExhibitionList = (props) => {
  const [exhibitions, setExhibitions] = useState(props.exhibitions || []);

  const deleteExhibition = (exhibitionID) => {
    adminDeleteExhibitionApiFunc(exhibitionID)
      .then(() => {
        // Remove the deleted exhibition from the state
        const updatedExhibitions = exhibitions.filter(
          (exhibition) => exhibition.exhibitionID !== exhibitionID
        );
        setExhibitions(updatedExhibitions);
        console.log(updatedExhibitions);
      })
      .catch((error) => {
        console.error("Error deleting exhibition", error.message);
      });
  };

  useEffect(() => {
    setExhibitions(props.exhibitions || []);
  }, [props.exhibitions]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Exhibitions</h1>
      </div>

      <div className={styles.exhibitionListContainer}>
        {exhibitions.map((exhibition) => (
          <Exhibition
            key={exhibition.exhibitionID}
            exhibitionID={exhibition.exhibitionID}
            title={exhibition.exhibitionName}
            description={exhibition.exhibitionDescriptor}
            auctions={exhibition.auctions}
            onDelete={deleteExhibition}
          />
        ))}
      </div>
    </div>
  );
};

export default ExhibitionList;
