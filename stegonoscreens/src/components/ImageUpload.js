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

        // 2097152
        if(file.size <= 397152){
            const fileForDisplay = URL.createObjectURL(file);

            console.log(file.size);

            func(file);
            displayImage(fileForDisplay);
        }
        else{
            console.log('tooDamnBig');
        };
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