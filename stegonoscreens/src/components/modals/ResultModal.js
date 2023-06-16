// Modal that displays a resulting image from the server.
import { useContext } from "react";

import AppContext from "../../store/app-context.js";

import Modal from "react-bootstrap/Modal";

import strings from "../../static/strings.js";

import classes from "./style/ResultModal.module.css";

function ResultModal() {
  const appCtx = useContext(AppContext);

  function handleClose() {
    // Close button behavior.
    appCtx.popResult("");
  }

  // The modal only displays the resulting image.
  return (
    <Modal
      size="md"
      show={appCtx.showResult}
      onHide={handleClose}
      className={classes.resultsModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {strings.resultsModal.header[appCtx.language]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{strings.resultsModal.download[appCtx.language]}</span>
        <div className={classes.imageContainer}>
          <img src={appCtx.result} className={classes.result} alt="result" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ResultModal;
