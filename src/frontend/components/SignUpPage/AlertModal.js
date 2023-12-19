import styles from "./SignUp.module.css"

const AlertModal = (props) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalDiv}>
          <p>{props.message}</p>
          <button className={styles.closeButton} onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };

export default AlertModal