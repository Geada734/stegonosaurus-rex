import { useContext } from 'react';

import Modal from 'react-bootstrap/Modal';

import AppContext from '../store/app-context.js'

import strings from '../static/strings.js';

import classes from './ImageDisplayModal.module.css';

function ImageDisplayModal(props) {

    function handleClose(){
        props.showHandler(false);
    };

    return <Modal size='lg' show={props.showModal} onHide={handleClose} 
        className={classes.resultsModal}>
        <Modal.Header closeButton>
            <Modal.Title>Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>
                Your download will start automatically, otherwise, feel free to 
                download the displayed image.
            </span>
            <div className={classes.imageContainer}>
                <img src={props.image} className={classes.result}/>
            </div>
        </Modal.Body>
    </Modal>
};

export default ImageDisplayModal;