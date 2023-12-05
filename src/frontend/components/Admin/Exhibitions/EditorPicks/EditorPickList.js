import EditorPick from "./EditorPick";
import styles from "./EditorPick.module.css";

const editorPicks = [
  {
    id: 1,
    title: "Test ABC",
    type: "auction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend aliquam tristique. In ut lectus est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vel elementum ex. Praesent porta ornare eros in condimentum. In hac habitasse platea dictumst. Suspendisse vulputate vestibulum lacus, sit amet aliquam tortor.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend aliquam tristique. In ut lectus est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vel elementum ex. Praesent porta ornare eros in condimentum. In hac habitasse platea dictumst. Suspendisse vulputate vestibulum lacus, sit amet aliquam tortor.  ",
    imageUrl: "/photos/loginpage.png",
  },

  {
    id: 2,
    title: "Test ABC",
    type: "auction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend aliquam tristique. In ut lectus est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vel elementum ex. Praesent porta ornare eros in condimentum. In hac habitasse platea dictumst. Suspendisse vulputate vestibulum lacus, sit amet aliquam tortor.    ",
    imageUrl: "/photos/loginpage.png",
  },
  {
    id: 3,
    title: "Test ABC",
    type: "auction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend aliquam tristique. In ut lectus est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vel elementum ex. Praesent porta ornare eros in condimentum. In hac habitasse platea dictumst. Suspendisse vulputate vestibulum lacus, sit amet aliquam tortor.    ",
    imageUrl: "/photos/loginpage.png",
  },
  {
    id: 3,
    title: "Test Person",
    type: "artist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend aliquam tristique. In ut lectus est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus vel elementum ex. Praesent porta ornare eros in condimentum. In hac habitasse platea dictumst. Suspendisse vulputate vestibulum lacus, sit amet aliquam tortor.    ",
    imageUrl: "/photos/signuppage.png",
  },
  
];

const EditorPickList = (props) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listHeaderContainer}>
        <h1 className={styles.listHeader}>Editors' Pick</h1>
      </div>

      <div className={styles.editorPickListContainer}>
        {editorPicks.map((editorPick) => (
          <EditorPick
            key={editorPick.id}
            title={editorPick.title}
            type={editorPick.type}
            imageUrl={editorPick.imageUrl}
            description={editorPick.description}
          />
        ))}
      </div>
    </div>
  );
};

export default EditorPickList;
