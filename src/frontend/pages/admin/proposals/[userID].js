import Navbar from "@/components/Admin/UI/Navbar/Navbar";
import styles from "../../../components/Admin/Proposals/AdminProposalsPage.module.css";
import ProposalList from "@/components/Admin/Proposals/ProposalList/ProposalList";
const AdminProposalsPage = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <ProposalList></ProposalList>
      </div>
    </>
  );
};

export default AdminProposalsPage;
