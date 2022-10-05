import { useContext } from 'react';

import Modal from 'react-bootstrap/Modal';

import AppContext from '../store/app-context.js';

import classes from './ErrorModal.module.css';

function ErrorModal(props){
    const appCtx = useContext(AppContext);

    function closeHandler(){
        props.showHandler();
    };

    function renderComponent(){
        if(props.error){
            return  <Modal size='md' onHide={closeHandler} show={props.showModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.error.code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className={classes.errorSummary}>{props.error[appCtx.language].summary}</h5>
                <span>{props.error[appCtx.language].message}</span>
            </Modal.Body>
        </Modal>
        }
        else{
            return <Modal />;
        };
    };

    return renderComponent();
};

export default ErrorModal;
