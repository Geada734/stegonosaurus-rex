import { useState } from 'react';
import classes from './ImageUpload.module.css';

import Form from 'react-bootstrap/Form';

import upload from '../static/icons/upload.svg';

function ImageUpload(props) {
    const [displayedImage, setDisplayedImage] = useState(upload);

    function displayImage(file) {
        setDisplayedImage(file);
    };

    function submitHandler(event, func){
        const file = event.target.files[0]
        const fileForDisplay = URL.createObjectURL(file);

        func(file);
        displayImage(fileForDisplay);
    };

    return <div className={classes.container}>
        <div className={classes.imageContainer}>
            <img src={displayedImage} className={classes.image + ' ' + classes.uploadLogo }></img>
        </div>
        <Form.Label>{props.message}</Form.Label>
        <Form.Control type='file' accept='image/png' size='sm' 
            onChange={(e) => submitHandler(e, props.func)}>
        </Form.Control>
    </div>;
};

export default ImageUpload;