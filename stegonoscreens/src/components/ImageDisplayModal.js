import { useContext } from 'react';

import Modal from 'react-bootstrap/Modal';

import AppContext from '../store/app-context.js'

import strings from '../static/strings.js';

import classes from './ImageDisplayModal.module.css';

function ImageDisplayModal(props) {

    function handleClose(){
        props.showHandler(false);
    };

    return <Modal size='lg' show={props.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            Results
        </Modal.Header>
        <Modal.Body>
            <div className={classes.imageContainer}>
                <img src={props.image} className={classes.result}/>
            </div>
        </Modal.Body>
    </Modal>
};

export default ImageDisplayModal;