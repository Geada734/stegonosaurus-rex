import { useState, useContext } from 'react';
import classes from './ImageUpload.module.css';

import ErrorModal from './ErrorModal';

import Form from 'react-bootstrap/Form';

import errors from '../static/errors.js';
import upload from '../static/icons/upload.svg';

function ImageUpload(props) {
    const [displayedImage, setDisplayedImage] = useState(upload);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);

    function submitHandler(event, func){
        const file = event.target.files[0]

        if(file.size <= 2097152){
            const fileForDisplay = URL.createObjectURL(file);

            func(file);
            displayImage(fileForDisplay);
        }
        else{
            setError(errors.imgTooLarge)
            showErrorModal();
        };
    };

    function displayImage(file) {
        setDisplayedImage(file);
    };

    function showErrorModal(){
        setShowError(true);
    };

    function closeErrorModal(){
        setError(null);
        setShowError(false);
    };

    return <div className={classes.container}>
        <div className={classes.imageContainer}>
            <img src={displayedImage} className={classes.image + ' ' + classes.uploadLogo }></img>
        </div>
        <Form.Label>{props.message}</Form.Label>
        <Form.Control type='file' accept='image/png' size='sm' 
            onChange={(e) => submitHandler(e, props.func)}>
        </Form.Control>
        <ErrorModal showModal={showError} showHandler={closeErrorModal} error={error}/>
    </div>;
};

export default ImageUpload;
