import { useContext } from 'react';

import Modal from 'react-bootstrap/Modal';

import AppContext from '../store/app-context.js'

import strings from '../static/strings.js';

import classes from './ResultModal.module.css';

function ResultModal(props) {
    const appCtx = useContext(AppContext);

    function handleClose(){
        appCtx.setShowResult(false);
        appCtx.setResult('');
    };

    return <Modal size='md' show={appCtx.showResult} onHide={handleClose} 
        className={classes.resultsModal}>
        <Modal.Header closeButton>
            <Modal.Title>{strings.resultsModal.header[appCtx.language]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>{strings.resultsModal.download[appCtx.language]}</span>
            <div className={classes.imageContainer}>
                <img src={appCtx.result} className={classes.result}/>
            </div>
        </Modal.Body>
    </Modal>
};

export default ResultModal;