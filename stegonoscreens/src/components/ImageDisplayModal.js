import { useContext } from 'react';

import Modal from 'react-bootstrap/Modal';

import AppContext from '../store/app-context.js'

import strings from '../static/strings.js';

import classes from './ImageDisplayModal.module.css';

function ImageDisplayModal(props) {
    const appCtx = useContext(AppContext);

    function handleClose(){
        props.showHandler(false);
    };

    return <Modal size='lg' show={props.showModal} onHide={handleClose} 
        className={classes.resultsModal}>
        <Modal.Header closeButton>
            <Modal.Title>{strings.resultsModal.header[appCtx.language]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>{strings.resultsModal.download[appCtx.language]}</span>
            <div className={classes.imageContainer}>
                <img src={props.image} className={classes.result}/>
            </div>
        </Modal.Body>
    </Modal>
};

export default ImageDisplayModal;