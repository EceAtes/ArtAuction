import Navbar from "@/components/Collector/UI/Navbar/Navbar";
import styles from "../../../components/Collector/Exhibitions/CollectorExhibitionsPage.module.css";
import EditorPickList from "@/components/Collector/Exhibitions/EditorPicks/EditorPickList";
import ExhibitionList from "@/components/Collector/Exhibitions/Exhibitions/ExhibitionList";
const CollectorExhibitionPage = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <EditorPickList></EditorPickList>
        <ExhibitionList></ExhibitionList>
      </div>
    </>
  );
};

export default CollectorExhibitionPage;
