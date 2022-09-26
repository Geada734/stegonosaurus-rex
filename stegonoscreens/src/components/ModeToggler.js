import { useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import classes from './ModeToggler.module.css';

import ImageUpload from './ImageUpload';
import LoadingModal from './LoadingModal';

import AppContext from '../store/app-context';

import strings from '../static/strings.js';

function ModeToggler(props){
    const appCtx = useContext(AppContext);

    const [tabValue, setTabValue] = useState('encode'); 
    const [decodeMode, setDecodeMode] = useState('t');

    const [codedMessageImage, setCodedMessageImage] = useState(null);
    const [messageImage, setMessageImage] = useState(null);
    const [imageToDecode, setImageToDecode] = useState(null);

    const [showLoading, setShowLoading] = useState(false);

    function modeHandler(mode) {
        setCodedMessageImage(null);
        setMessageImage(null);
        setImageToDecode(null);
        setDecodeMode('t');

        setTabValue(mode);
    };

    function decodeModeHandler(e, dMode) {
        e.preventDefault();
        setDecodeMode(dMode);
    };

    function imageToDecodeHandler(file) {
        setImageToDecode(file);
    };

    function codedMessageImageHandler(file) {
        setCodedMessageImage(file);
    };

    function messageImageHandler(file) {
        setMessageImage(file);
    };

    function showModalHandler(e){
        e.preventDefault();
        setShowLoading(true);
    };

    function renderComponent() {
        if(tabValue==='encode') {
            return <Container>
                <Row>
                    <Col>
                        <ImageUpload func={codedMessageImageHandler}
                            message={strings.modeToggler.messageImageMessage[appCtx.language]}/>
                    </Col>
                    <Col>
                        <ImageUpload func={messageImageHandler}
                            message={strings.modeToggler.toCodeImageMessage[appCtx.language]}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant='outline-dark' onClick={showModalHandler}
                            disabled={!codedMessageImage || !messageImage} 
                            className={classes.executeButton}>
                            {strings.modeToggler.buttonMessage.encode[appCtx.language]}
                        </Button>
                    </Col>
                </Row>
            </Container>;
        }

        else if(tabValue==='decode') {
            return  <div>
                <Container>
                    <Row>
                        <Col>
                            <p>{strings.modeToggler.decodingModeLabel[appCtx.language]}</p>
                            <ButtonGroup>
                                <Button variant='outline-dark' active={decodeMode === 't'} 
                                    onClick={(e) => decodeModeHandler(e, 't')}>
                                    {strings.modeToggler.decodingModes.t[appCtx.language]}
                                </Button>
                                <Button variant='outline-dark' active={decodeMode === 'b'}
                                    onClick={(e) => decodeModeHandler(e, 'b')}>
                                    {strings.modeToggler.decodingModes.b[appCtx.language]}
                                </Button>
                            </ButtonGroup>
                            <ImageUpload func={imageToDecodeHandler} 
                                message={strings.modeToggler.toDecodeImageMessage[appCtx.language]}/>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant='outline-dark' onClick={showModalHandler}
                            disabled={imageToDecode ? false : true} 
                            className={classes.executeButton}>
                            {strings.modeToggler.buttonMessage.decode[appCtx.language]}
                        </Button>
                    </Row>
                </Container>
            </div>;
        };

        return <div>Error loading component</div>;
    };

    return <div>
        <Nav variant='tabs' defaultActiveKey={tabValue} onSelect={modeHandler}>
            <Nav.Item>
                <Nav.Link eventKey='encode'>{strings.modeToggler.modes.encode[appCtx.language]}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='decode'>{strings.modeToggler.modes.decode[appCtx.language]}</Nav.Link>
            </Nav.Item>
        </Nav>
        { renderComponent() }
        <LoadingModal showModal={showLoading}></LoadingModal>
    </div>;
};

export default ModeToggler;