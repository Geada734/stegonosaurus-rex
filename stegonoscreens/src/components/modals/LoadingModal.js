import { useContext } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

import AppContext from '../../store/app-context.js'

import classes from './style/LoadingModal.module.css';

function LoadingModal() {
    const appCtx = useContext(AppContext);

    return <Modal show={appCtx.showLoading} size='sm'>
        <Modal.Header>
            <Modal.Title>{appCtx.loadingText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={classes.spinnerContainer}>
                <Spinner animation='border' role='status'></Spinner>
            </div>
        </Modal.Body>
    </Modal>
};

export default LoadingModal;