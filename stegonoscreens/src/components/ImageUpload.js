import classes from './ImageUpload.module.css';

import Form from 'react-bootstrap/Form';

import upload from '../static/icons/upload.svg';

function ImageUpload(props) {
    return <div className={classes.container}>
        <div className={classes.imageContainer}>
            <img src={upload} className={classes.image + ' ' + classes.uploadLogo }></img>
        </div>
        <Form.Label>{props.message}</Form.Label>
        <Form.Control type='file' size='sm'></Form.Control>
    </div>;
};

export default ImageUpload;