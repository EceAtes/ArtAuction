import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import styles from "../../../components/Admin/Exhibitions/AdminExhibitionsPage.module.css";
import EditorPickList from "@/components/Admin/Exhibitions/EditorPicks/EditorPickList";
import ExhibitionList from "@/components/Admin/Exhibitions/Exhibitions/ExhibitionList";
import { useState, useEffect } from "react";
import {
  editorPicksHighlightedArtUsersApiFunction,
  editorPicksHighlightedAuctionsApiFunction,
  editorsPicksExhibitionsApiFunction,
} from "@/pages/api/editorpicks";
const AdminExhibitionsPage = (props) => {
  const [highlightedAuctions, setHighlightedAuctions] = useState([]);
  const [highlightedArtUsers, setHighlightedArtUsers] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    editorPicksHighlightedArtUsersApiFunction()
      .then((data) => {
        console.log("Editor picks successful ", data);
        setHighlightedArtUsers(data);
        editorPicksHighlightedAuctionsApiFunction().then((data) => {
          console.log("Editor picks successful ", data);
          setHighlightedAuctions(data);
          editorsPicksExhibitionsApiFunction().then((data) => {
            console.log("Editor picks successful ", data);
            setExhibitions(data);
          });
        });
      })
      .catch((error) => {
        console.error("Editor picks failed", error.message);
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <EditorPickList
          highlightedArtUsers={highlightedArtUsers}
          highlightedAuctions={highlightedAuctions}
        ></EditorPickList>
        <ExhibitionList exhibitions={exhibitions}></ExhibitionList>
      </div>
    </>
  );
};

export default AdminExhibitionsPage;
