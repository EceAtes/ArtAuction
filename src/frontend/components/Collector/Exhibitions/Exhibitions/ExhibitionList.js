import Exhibition from "./Exhibition";
import styles from "./Exhibition.module.css";

const ExhibitionList = (props) => {

  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Exhibitions</h1>
      </div>

      <div className={styles.exhibitionListContainer}>
        {props.exhibitions.map((exhibition) => (
          <Exhibition
            key={exhibition.exhibitionID}
            exhibitionID={exhibition.exhibitionID}
            title={exhibition.exhibitionName}
            description={exhibition.exhibitionDescriptor}
            auctions={exhibition.auctions}
          />
        ))}
      </div>
    </div>
  );
};

export default ExhibitionList;
