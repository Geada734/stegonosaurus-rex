// The main component in the app, ladies and gentlemen,
// the ImageProcessor.
import { useState, useContext, useRef } from "react";

import AppContext from "../../store/app-context";

import Nav from "react-bootstrap/Nav";
import ReCAPTCHA from "react-google-recaptcha";

import DecodeMode from "./modes/DecodeMode";
import EncodeMode from "./modes/EncodeMode";

import config from "../../configs/config.json";
import strings from "../../static/strings";

import classes from "./style/ImageProcessor.module.css";

function ImageProcessor() {
 const appCtx = useContext(AppContext);

 // Captcha usage still requires useRef.
 const captchaRef = useRef(null);
 const [captchaValue, setCaptchaValue] = useState(null);

 // Possible tab values.
 const encodeTabValue = "encode";
 const decodeTabValue = "decode";

 // Operational mode.
 const [tabValue, setTabValue] = useState(encodeTabValue);

 // Handles operational mode changes.
 function modeHandler(mode) {
  /*
   * mode: operational mode.
   */
  setTabValue(mode);
  resetCaptcha();
 }

 // Handles captcha value changes.
 function onCaptchaChanged(value) {
  /*
   * value: captcha value.
   */
  setCaptchaValue(captchaRef.current.getValue());
 }

 // Resets all captcha props.
 function resetCaptcha() {
  captchaRef.current.reset();
  setCaptchaValue(captchaRef.current.getValue());
 }

 // Renders a different component depending on the selected operational mode.
 function renderComponent() {
  if (tabValue === encodeTabValue) {
   return (
    <EncodeMode captchaValue={captchaValue} captchaReset={resetCaptcha} />
   );
  } else if (tabValue === decodeTabValue) {
   return (
    <DecodeMode captchaValue={captchaValue} captchaReset={resetCaptcha} />
   );
  }
 }

 return (
  // The component contains each image processing mode component and the captcha component.
  <div>
   <Nav variant="tabs" defaultActiveKey={tabValue} onSelect={modeHandler}>
    <Nav.Item>
     <Nav.Link eventKey={encodeTabValue}>
      {strings.imageProcessor.modes.encode[appCtx.language]}
     </Nav.Link>
    </Nav.Item>
    <Nav.Item>
     <Nav.Link eventKey={decodeTabValue}>
      {strings.imageProcessor.modes.decode[appCtx.language]}
     </Nav.Link>
    </Nav.Item>
   </Nav>
   {renderComponent()}
   <div className={classes.captchaContainer}>
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
