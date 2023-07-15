// Modal that lets the user know the app is loading.
import { useContext } from "react";

import AppContext from "../../store/app-context";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import classes from "./style/LoadingModal.module.css";

function LoadingModal() {
  const appCtx = useContext(AppContext);

  // The loading modal only displays a spinning wheel, and
  // header with text.
  return (
    <Modal show={appCtx.showLoading} className={classes.loadingModal} size="sm">
      <Modal.Header>
        <Modal.Title className={classes.loadingHeader}>{appCtx.loadingText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.spinnerContainer}>
          <Spinner animation="border" role="status"></Spinner>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;
