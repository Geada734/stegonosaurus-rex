import { useContext } from "react";

import Modal from "react-bootstrap/Modal";

import AppContext from "../../store/app-context.js";

import classes from "./style/ErrorModal.module.css";

function ErrorModal() {
  const appCtx = useContext(AppContext);

  function closeHandler() {
    appCtx.raiseError(null);
  }

  if (appCtx.error) {
    return (
      <Modal
        size="md"
        onHide={closeHandler}
        show={appCtx.showError}
        backdrop="static"
      >
        <Modal.Header
          closeButton={appCtx.error.code !== "ERR06" ? true : false}
        >
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
