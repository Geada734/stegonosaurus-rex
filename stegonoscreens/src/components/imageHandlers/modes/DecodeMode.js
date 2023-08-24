// Image Handler for decoding.
import { useState, useContext } from "react";

import AppContext from "../../../store/app-context";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import ImageUpload from "../ImageUpload";

import * as errorHandlers from "../../../utils/errorHandlers";
import * as api from "../../../apis/stegonoApi";
import * as stegonoForms from "../../../utils/stegonoForms";
import strings from "../../../static/strings";

import classes from "../style/DecodeMode.module.css";

function DecodeMode(props) {
 const appCtx = useContext(AppContext);

 // Decode modes for the tabs.
 const transparentModeValue = "t"
 const blackModeValue = "b"

 // Operation mode for the image upload component.
 const uploadOperation = "decode"

 const [decodeMode, setDecodeMode] = useState(transparentModeValue);
 const [imageToDecode, setImageToDecode] = useState(null);

 // Handle the response from the API calls to the Stegonoserver.
 function handleResponse(response) {
  /*
   * response: REST response.
   */
  const res = "data:image/png;base64, " + response.data.result;
  const resName = response.data.filename;

  appCtx.popLoading("");
  appCtx.popResult(res);

  return {
   fileData: res,
   fileName: resName,
  };
 }

 // Handles the response after the image has been retrieved.
 function handleResults(results) {
  /*
   * results: image in the response.
   */
  const link = document.createElement("a");
  link.href = results.fileData;

  link.setAttribute("download", results.fileName);

  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
 }

 // Handles REST errors.
 function handleError(e) {
  /*
   * e: REST error.
   */
  appCtx.popLoading("");
  errorHandlers.handleRestError(e, appCtx.raiseError);
 }

 // Handles the images and submits them to the server.
 function submitHandler(event) {
  /*
   * event: click event.
   */
  event.preventDefault();

  // Resets captcha token.
  props.captchaReset();

  appCtx.popLoading(strings.loadingModal.processingImages[appCtx.language]);

  const decodeForm = stegonoForms.createDecodingForm(
   props.captchaValue,
   imageToDecode,
   imageToDecode.name,
   decodeMode
  );
  
  // Calls the decode endpoint.
  api.decode(
   handleResponse,
   handleResults,
   handleError,
   decodeForm
  );
 }

 // Handles changes in the decode mode.
 function decodeModeHandler(event, dMode) {
  /*
   * event: switch event.
   * dMode: selected decode mode.
   */
  event.preventDefault();
  setDecodeMode(dMode);
 }

 // Sets the image to decode from the image upload.
 function imageToDecodeHandler(file) {
  /*
   * file: uploaded file.
   */
  setImageToDecode(file);
 }

 return (
  <Container>
   <Row>
    <Col>
     <p>{strings.imageProcessor.decodingModeLabel[appCtx.language]}</p>
     <ButtonGroup>
      <Button
       variant="outline-dark"
       active={decodeMode === transparentModeValue}
       onClick={(e) => decodeModeHandler(e, transparentModeValue)}
      >
       {strings.imageProcessor.decodingModes.t[appCtx.language]}
      </Button>
      <Button
       variant="outline-dark"
       active={decodeMode === blackModeValue}
       onClick={(e) => decodeModeHandler(e, blackModeValue)}
      >
       {strings.imageProcessor.decodingModes.b[appCtx.language]}
      </Button>
     </ButtonGroup>
     <ImageUpload
      id={uploadOperation + "-upload"}
      imageHandler={imageToDecodeHandler}
      operation={uploadOperation}
      message={strings.imageProcessor.toDecodeImageMessage[appCtx.language]}
     />
    </Col>
   </Row>
   <Row>
    <Button
     variant="outline-dark"
     onClick={(e) => submitHandler(e)}
     disabled={imageToDecode && props.captchaValue ? false : true}
     className={classes.executeButton}
    >
     {strings.imageProcessor.buttonMessage.decode[appCtx.language]}
    </Button>
   </Row>
  </Container>
 );
}

export default DecodeMode;
