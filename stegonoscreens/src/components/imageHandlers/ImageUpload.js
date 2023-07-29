// Component for image uploads.
import { useState, useContext } from "react";

import AppContext from "../../store/app-context";

import Form from "react-bootstrap/Form";

import config from "../../configs/config.json";
import errors from "../../static/errors";
import upload from "../../static/icons/upload.svg";

import classes from "./style/ImageUpload.module.css";

function ImageUpload(props) {
  // Images should be smaller than 2 MB or whatever is specified in configs.
  const sizeLimit = config.imageSizeLimit;

  const appCtx = useContext(AppContext);
  const [displayedImage, setDisplayedImage] = useState(upload);

  // Function that sets the uploaded image for the request.
  function submitHandler(event, imageHandler) {
    /*
     * event: upload event.
     * imageHandler: callback that will handle the image.
     */
    const file = event.target.files[0];
    if (file) {
      if (file.size && file.size <= sizeLimit) {
        if(file.type && file.type === "image/png"){
          // If there's an uploaded image, display it.
          const fileForDisplay = URL.createObjectURL(file);

          imageHandler(file);
          setDisplayedImage(fileForDisplay);
        }
        else {
          // If the chosen file isn't a .png multi-band image, display an error.
          appCtx.raiseError(errors.wrongFormat);
        };
      } else {
        // If the image is larger than permitted, display an error.
        appCtx.raiseError(errors.imgTooLarge);
      }
    } else {
      // If there's no uploaded image, display the upload logo.
      imageHandler(null);
      setDisplayedImage(upload);
    }
  }

  // The component has a space to upload an image, and an image logo
  // that will be replaced with the uploaded image.
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src={displayedImage}
          className={classes.image + " " + classes.uploadLogo}
          alt="to upload"
        ></img>
      </div>
      <Form.Label htmlFor={props.operation + "-submit-input"}>{props.message}</Form.Label>
      <Form.Control
        id={props.operation + "-submit-input"}
        type="file"
        accept="image/png"
        size="sm"
        onChange={(e) => submitHandler(e, props.imageHandler)}
      ></Form.Control>
    </div>
  );
}

export default ImageUpload;
