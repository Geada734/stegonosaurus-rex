import config from "../../configs/config.json";

import { useState, useContext, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReCAPTCHA from "react-google-recaptcha";

import classes from "./style/ImageProcessor.module.css";

import ImageUpload from "./ImageUpload";
import AppContext from "../../store/app-context";

import strings from "../../static/strings.js";
import * as errorHandlers from "../../utils/errorHandlers";
import * as api from "../../apis/stegonoApi";
import * as stegonoForms from "../../utils/stegonoForms";

function ImageProcessor() {
  const appCtx = useContext(AppContext);

  const captchaRef = useRef(null);

  const [invalidCaptcha, setInvalidCaptcha] = useState(false);

  const [tabValue, setTabValue] = useState("encode");
  const [decodeMode, setDecodeMode] = useState("t");

  const [codedMessageImage, setCodedMessageImage] = useState(null);
  const [messageImage, setMessageImage] = useState(null);
  const [imageToDecode, setImageToDecode] = useState(null);

  function handleResponse(response) {
    const res = "data:image/png;base64, " + response.data.result;
    const resName = response.data.filename;

    appCtx.popLoading("");
    appCtx.popResult(res);

    return {
      fileData: res,
      fileName: resName,
    };
  }

  function handleResults(results) {
    const link = document.createElement("a");
    link.href = results.fileData;

    link.setAttribute("download", results.fileName);

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  function handleError(e) {
    appCtx.popLoading("");
    errorHandlers.handleRestError(e, appCtx.raiseError);
  }

  function submitHandler(e, endpoint) {
    e.preventDefault();
    const captchaValue = captchaRef.current.getValue();

    if (captchaValue) {
      captchaRef.current.reset();
      appCtx.popLoading(strings.loadingModal.processingImages[appCtx.language]);

      if (endpoint === "encode") {
        const encodeForm = stegonoForms.createEncodingForm(
          captchaValue,
          codedMessageImage,
          messageImage,
          messageImage.name
        );
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
        api.decode(
          handleResponse,
          handleResults,
          handleError,
          appCtx.token,
          decodeForm
        );
      }
    } else {
      setInvalidCaptcha(true);
    }
  }

  function modeHandler(mode) {
    setCodedMessageImage(null);
    setMessageImage(null);
    setImageToDecode(null);
    setDecodeMode("t");

    setTabValue(mode);
  }

  function decodeModeHandler(e, dMode) {
    e.preventDefault();
    setDecodeMode(dMode);
  }

  function imageToDecodeHandler(file) {
    setImageToDecode(file);
  }

  function codedMessageImageHandler(file) {
    setCodedMessageImage(file);
  }

  function messageImageHandler(file) {
    setMessageImage(file);
  }

  function onCaptchaChanged(value) {
    value ? setInvalidCaptcha(false) : setInvalidCaptcha(true);
  }

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
                  strings.imageProcessor.messageImageMessage[appCtx.language]
                }
              />
            </Col>
            <Col>
              <ImageUpload
                id="message-upload"
                imageHandler={messageImageHandler}
                message={
                  strings.imageProcessor.toCodeImageMessage[appCtx.language]
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-dark"
                onClick={(e) => submitHandler(e, "encode")}
                disabled={!codedMessageImage || !messageImage}
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
