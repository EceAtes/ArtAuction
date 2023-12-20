import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import styles from "../../../components/Admin/Approve/ApprovePage.module.css";
import { useEffect, useState } from "react";
import { adminGetEndedAuctionsApiFunction } from "@/pages/api/admin";
import ApproveAuctionList from "@/components/Admin/Approve/ApproveList/ApproveAuctionList";
const AdminProposalsPage = (props) => {
  const [approveAuctions, setApproveAuctions] = useState([]);

  useEffect(() => {
    adminGetEndedAuctionsApiFunction()
      .then((data) => {
        console.log("Admin approve auctions success", data);
        setApproveAuctions(data);
      })
      .catch((error) => {
        console.error("Admin proposed auctions failed", error);
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        {approveAuctions.length > 0 ? (
          <ApproveAuctionList approveAuctions={approveAuctions}></ApproveAuctionList>
        ) : (
          <h2 className={styles.heading}>No auctions to be approved available.</h2>
        )}
      </div>
    </>
  );
};

export default AdminProposalsPage;
