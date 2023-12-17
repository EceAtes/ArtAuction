import EditorPick from "./EditorPick";
import styles from "./EditorPick.module.css";

const EditorPickList = (props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Editors' Pick</h1>
      </div>

      <div className={styles.editorPickListContainer}>
        {props.highlightedAuctions.map((auction) => (
          <EditorPick
            key={auction.auctionID}
            id={auction.auctionID}
            title={auction.title}
            type={"auction"}
            imageUrl={"/photos/loginpage.png"}
            description={auction.description}
          />
        ))}
        {props.highlightedArtUsers.map((artuser) => (
          <EditorPick
            key={artuser.userID}
            id={artuser.userID}
            name={artuser.name}
            type={"artuser"}
            role={artuser.role}
            imageUrl={"/photos/signuppage.png"}
            bio={artuser.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default EditorPickList;
