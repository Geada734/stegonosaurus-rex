import { useContext } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

import AppContext from '../store/app-context.js'

import strings from '../static/strings.js';

import classes from './LoadingModal.module.css';

function LoadingModal(props) {
    const appCtx = useContext(AppContext);

    return <Modal show={props.showModal} size='sm'>
        <Modal.Header>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={classes.spinnerContainer}>
                <Spinner animation='border' role='status'></Spinner>
            </div>
        </Modal.Body>
    </Modal>
};

export default LoadingModal;