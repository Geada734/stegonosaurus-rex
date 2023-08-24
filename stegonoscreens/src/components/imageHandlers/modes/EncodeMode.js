// Image Handler for encoding.
import { useState, useContext } from "react";

import AppContext from "../../../store/app-context";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ImageUpload from "../ImageUpload";

import * as errorHandlers from "../../../utils/errorHandlers";
import * as api from "../../../apis/stegonoApi";
import * as stegonoForms from "../../../utils/stegonoForms";
import strings from "../../../static/strings";

import classes from "../style/EncodeMode.module.css";

function EncodeMode(props) {
 const appCtx = useContext(AppContext);

 // Operation mode for the image upload components.
 const uploadOperationCoded = "coded";
 const uploadOperationTemplate = "template";

 // Images to encode.
 const [codedMessageImage, setCodedMessageImage] = useState(null);
 const [templateImage, setTemplateImage] = useState(null);

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

  const encodeForm = stegonoForms.createEncodingForm(
   props.captchaValue,
   codedMessageImage,
   templateImage,
   templateImage.name
  );
  
  // Calls the encode endpoint.
  api.encode(
   handleResponse,
   handleResults,
   handleError,
   encodeForm
  );
 }

 // Sets the image with the coded message from the image upload.
 function codedMessageImageHandler(file) {
  /*
   * file: uploaded file.
   */
  setCodedMessageImage(file);
 }

 // Sets the template image from the image upload.
 function templateImageHandler(file) {
  /*
   * file: uploaded file.
   */
  setTemplateImage(file);
 }

 return (
  <Container>
   <Row>
    <Col>
     <ImageUpload
      id={uploadOperationCoded + "-upload"}
      imageHandler={codedMessageImageHandler}
      operation={uploadOperationCoded}
      message={strings.imageProcessor.codedImageMessage[appCtx.language]}
     />
    </Col>
    <Col>
     <ImageUpload
      id={uploadOperationTemplate + "-upload"}
      imageHandler={templateImageHandler}
      operation={uploadOperationTemplate}
      message={strings.imageProcessor.templateImageMessage[appCtx.language]}
     />
    </Col>
   </Row>
   <Row>
    <Col>
     <Button
      variant="outline-dark"
      onClick={(e) => submitHandler(e)}
      disabled={!codedMessageImage || !templateImage || !props.captchaValue}
      className={classes.executeButton}
     >
      {strings.imageProcessor.buttonMessage.encode[appCtx.language]}
     </Button>
    </Col>
   </Row>
  </Container>
 );
}

export default EncodeMode;
