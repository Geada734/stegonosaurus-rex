// Modal displayed upon openning the application.
import { useContext } from "react";

import AppContext from "../../store/app-context";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import strings from "../../static/strings";
import constants from "../../static/constants";

import classes from "./style/DisclaimerModal.module.css";

function DisclaimerModal() {
 const appCtx = useContext(AppContext);

 function acknowledgeHandler(event) {
  // Acknowledge button behavior.
  event.preventDefault();
  appCtx.popDisclaimer(false);
  localStorage.setItem(constants.localValues.acknowledged, true);
 }

 // The modal displays a disclaimer to the user, closes when the info is acknowledged.
 return (
  <Modal
   className={classes.disclaimerModal}
   size="lg"
   show={appCtx.showDisclaimer}
   onHide={acknowledgeHandler}
  >
   <Modal.Header>
    <Modal.Title>{strings.disclaimerModal.header[appCtx.language]}</Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <div>{strings.disclaimerModal.info[appCtx.language]}</div>
    <div className={classes.buttonSpace}>
     <Button onClick={(e) => acknowledgeHandler(e)} variant="outline-dark">
      {strings.disclaimerModal.acknowledgeButton[appCtx.language]}
     </Button>
    </div>
   </Modal.Body>
  </Modal>
 );
}

export default DisclaimerModal;
