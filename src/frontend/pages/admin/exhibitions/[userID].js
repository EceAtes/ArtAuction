import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import EditorPickList from "@/components/Admin/Exhibitions/EditorPicks/EditorPickList";
const AdminExhibitionsPage = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <EditorPickList></EditorPickList>
      </div>
    </>
  );
};

export default AdminExhibitionsPage;
