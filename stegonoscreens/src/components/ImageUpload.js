import { useState } from 'react';
import classes from './ImageUpload.module.css';

import Form from 'react-bootstrap/Form';

import upload from '../static/icons/upload.svg';

function ImageUpload(props) {
    const [displayedImage, setDisplayedImage] = useState(upload);

    function displayImageHandler(event){
        const file = URL.createObjectURL(event.target.files[0]);
        setDisplayedImage(file);
    };

    return <div className={classes.container}>
        <div className={classes.imageContainer}>
            <img src={displayedImage} className={classes.image + ' ' + classes.uploadLogo }></img>
        </div>
        <Form.Label>{props.message}</Form.Label>
        <Form.Control type='file' accept='image/png' size='sm' 
            onChange={displayImageHandler}>
        </Form.Control>
    </div>;
};

export default ImageUpload;