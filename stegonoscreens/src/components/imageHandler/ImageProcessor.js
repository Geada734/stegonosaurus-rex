// The main component in the app, ladies and gentlemen,
// the ImageProcessor.
import { useState, useContext, useRef } from "react";

import AppContext from "../../store/app-context";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReCAPTCHA from "react-google-recaptcha";

import ImageUpload from "./ImageUpload";

import * as errorHandlers from "../../utils/errorHandlers";
import * as api from "../../apis/stegonoApi";
import * as stegonoForms from "../../utils/stegonoForms";

import config from "../../configs/config.json";
import strings from "../../static/strings.js";

import classes from "./style/ImageProcessor.module.css";

function ImageProcessor() {
  const appCtx = useContext(AppContext);

  // Captcha usage still requires useRef.
  const captchaRef = useRef(null);

  const [invalidCaptcha, setInvalidCaptcha] = useState(false);

  const [tabValue, setTabValue] = useState("encode");
  const [decodeMode, setDecodeMode] = useState("t");

  const [codedMessageImage, setCodedMessageImage] = useState(null);
  const [templateImage, setTemplateImage] = useState(null);
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
  function submitHandler(event, endpoint) {
    /*
     * event: click event.
     * endpoint: endpoint to be called.
     */
    event.preventDefault();
    const captchaValue = captchaRef.current.getValue();

    // Checks that there's a valid captcha value.
    if (captchaValue) {
      // Resets the value for this code.
      captchaRef.current.reset();
      appCtx.popLoading(strings.loadingModal.processingImages[appCtx.language]);

      if (endpoint === "encode") {
        const encodeForm = stegonoForms.createEncodingForm(
          captchaValue,
          codedMessageImage,
          templateImage,
          templateImage.name
        );
        // Calls the encode endpoint.
        api.encode(
          handleResponse,
          handleResults,
          handleError,
          appCtx.token,
          encodeForm
        );
      } else if (endpoint === "decode") {
        const decodeForm = stegonoForms.createDecodingForm(
          captchaValue,
          imageToDecode,
          imageToDecode.name,
          decodeMode
        );
        // Calls the decode endpoint.
        api.decode(
          handleResponse,
          handleResults,
          handleError,
          appCtx.token,
          decodeForm
        );
      }
    } else {
      // Tells the user the captcha is not correct.
      setInvalidCaptcha(true);
    }
  }

  // Handles operational mode changes.
  function modeHandler(mode) {
    /*
     * mode: operational mode.
     */

    // Resets images in the mode that is not selected.
    setCodedMessageImage(null);
    setTemplateImage(null);
    setImageToDecode(null);
    setDecodeMode("t");

    setTabValue(mode);
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

  // Handles captcha value changes.
  function onCaptchaChanged(value) {
    /*
     * value: captcha value.
     */
    value ? setInvalidCaptcha(false) : setInvalidCaptcha(true);
  }

  // Renders a different component depending on the selected operational mode.
  function renderComponent() {
    if (tabValue === "encode") {
      return (
        <Container>
          <Row>
            <Col>
              <ImageUpload
                id="coded-upload"
                imageHandler={codedMessageImageHandler}
                message={
                  strings.imageProcessor.codedImageMessage[appCtx.language]
                }
              />
            </Col>
            <Col>
              <ImageUpload
                id="message-upload"
                imageHandler={templateImageHandler}
                message={
                  strings.imageProcessor.templateImageMessage[appCtx.language]
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-dark"
                onClick={(e) => submitHandler(e, "encode")}
                disabled={!codedMessageImage || !templateImage}
                className={classes.executeButton}
              >
                {strings.imageProcessor.buttonMessage.encode[appCtx.language]}
              </Button>
            </Col>
          </Row>
        </Container>
      );
    } else if (tabValue === "decode") {
      return (
        <Container>
          <Row>
            <Col>
              <p>{strings.imageProcessor.decodingModeLabel[appCtx.language]}</p>
              <ButtonGroup>
                <Button
                  variant="outline-dark"
                  active={decodeMode === "t"}
                  onClick={(e) => decodeModeHandler(e, "t")}
                >
                  {strings.imageProcessor.decodingModes.t[appCtx.language]}
                </Button>
                <Button
                  variant="outline-dark"
                  active={decodeMode === "b"}
                  onClick={(e) => decodeModeHandler(e, "b")}
                >
                  {strings.imageProcessor.decodingModes.b[appCtx.language]}
                </Button>
              </ButtonGroup>
              <ImageUpload
                id="decode-upload"
                imageHandler={imageToDecodeHandler}
                message={
                  strings.imageProcessor.toDecodeImageMessage[appCtx.language]
                }
              />
            </Col>
          </Row>
          <Row>
            <Button
              variant="outline-dark"
              onClick={(e) => submitHandler(e, "decode")}
              disabled={imageToDecode ? false : true}
              className={classes.executeButton}
            >
              {strings.imageProcessor.buttonMessage.decode[appCtx.language]}
            </Button>
          </Row>
        </Container>
      );
    }

    return (
      <div>{strings.imageProcessor.componentLoadingError[appCtx.language]}</div>
    );
  }

  return (
    // The component contains the image uploads for each mode, a button to upload,
    // and the captcha component.
    <div>
      <Nav variant="tabs" defaultActiveKey={tabValue} onSelect={modeHandler}>
        <Nav.Item>
          <Nav.Link eventKey="encode">
            {strings.imageProcessor.modes.encode[appCtx.language]}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="decode">
            {strings.imageProcessor.modes.decode[appCtx.language]}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {renderComponent()}
      <div className={classes.captchaContainer}>
        <span hidden={!invalidCaptcha} className={classes.invalidCaptchaText}>
          {strings.imageProcessor.invalidCaptchaMessage[appCtx.language]}
        </span>
        <ReCAPTCHA
          sitekey={config.siteKey}
          ref={captchaRef}
          onChange={onCaptchaChanged}
        />
      </div>
    </div>
  );
}

export default ImageProcessor;
