import { useState, useContext } from 'react';
import classes from './style/ImageUpload.module.css';

import Form from 'react-bootstrap/Form';

import AppContext from '../../store/app-context.js'
import config from '../../configs/config.json'
import errors from '../../static/errors.js';
import upload from '../../static/icons/upload.svg';

function ImageUpload(props) {
    const sizeLimit = config.imageSizeLimit;

    const appCtx = useContext(AppContext);
    const [displayedImage, setDisplayedImage] = useState(upload);

    function submitHandler(event, imageHandler){
        const file = event.target.files[0]
        if(file) {
            if(file.size <= sizeLimit){
                const fileForDisplay = URL.createObjectURL(file);

                imageHandler(file);
                setDisplayedImage(fileForDisplay);
            }
            else{
                appCtx.raiseError(errors.imgTooLarge)
            };
        } else{
            imageHandler(null);
            setDisplayedImage(upload);
        }
    };

    return <div className={classes.container}>
        <div className={classes.imageContainer}>
            <img src={displayedImage} className={classes.image + ' ' + classes.uploadLogo }></img>
        </div>
        <Form.Label>{props.message}</Form.Label>
        <Form.Control type='file' accept='image/png' size='sm' 
            onChange={(e) => submitHandler(e, props.imageHandler)}>
        </Form.Control>
    </div>;
};

export default ImageUpload;
