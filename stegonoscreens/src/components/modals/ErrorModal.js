// Modal that displays an error.
import { useContext } from "react";

import AppContext from "../../store/app-context";

import Modal from "react-bootstrap/Modal";

import classes from "./style/ErrorModal.module.css";

function ErrorModal() {
 const appCtx = useContext(AppContext);

 function closeHandler() {
  // Close button behavior.
  appCtx.raiseError(null);
 }

 if (appCtx.error) {
  // Modal contains the error's info.
  return (
   <Modal
    className={classes.errorModal}
    size="md"
    onHide={closeHandler}
    show={appCtx.showError}
    backdrop="static"
   >
    <Modal.Header closeButton={true}>
     <Modal.Title>{appCtx.error.code}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <h5 className={classes.errorSummary}>
      {appCtx.error[appCtx.language].summary}
     </h5>
     <span>{appCtx.error[appCtx.language].message}</span>
    </Modal.Body>
   </Modal>
  );
 }

 return null;
}

export default ErrorModal;
