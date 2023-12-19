import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import styles from "../../../components/Admin/Proposals/AdminProposalsPage.module.css";
import ProposalList from "@/components/Admin/Proposals/ProposalList/ProposalList";
import { useEffect, useState } from "react";
import { adminProposedAuctionsApiFunction } from "@/pages/api/admin";
const AdminProposalsPage = (props) => {
  const [proposedAuctions, setProposedAuctions] = useState([]);

  useEffect(() => {
    adminProposedAuctionsApiFunction()
      .then((data) => {
        console.log("Admin proposed auctions successful ", data);
        setProposedAuctions(data);
      })
      .catch((error) => {
        console.error("Admin proposed auctions failed", error);
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        {proposedAuctions.length > 0 ? (
          <ProposalList proposedAuctions={proposedAuctions}></ProposalList>
        ) : (
          <h2 className={styles.heading}>No proposed auctions available.</h2>
        )}
      </div>
    </>
  );
};

export default AdminProposalsPage;
