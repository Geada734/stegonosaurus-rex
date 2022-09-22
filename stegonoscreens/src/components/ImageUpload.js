import classes from './ImageUpload.module.css';

import upload from '../static/logos/upload.svg';

function ImageUpload(props) {
    return <div className={classes.container}>
        <span>{props.message}</span>
        <input type='file'></input>
    </div>;
};

export default ImageUpload;