import config from '../../configs/config.json';

import { useState, useContext, useRef } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReCAPTCHA from 'react-google-recaptcha';

import classes from './style/ModeToggler.module.css';

import ImageUpload from './ImageUpload';
import AppContext from '../../store/app-context';

import strings from '../../static/strings.js';
import * as errorHandlers from '../../utils/errorHandlers';
import * as api from '../../apis/stegonoApi';

function ModeToggler(){
    const appCtx = useContext(AppContext);

    const captchaRef = useRef(null);

    const [invalidCaptcha, setInvalidCaptcha] = useState(false);

    const [tabValue, setTabValue] = useState('encode'); 
    const [decodeMode, setDecodeMode] = useState('t');

    const [codedMessageImage, setCodedMessageImage] = useState(null);
    const [messageImage, setMessageImage] = useState(null);
    const [imageToDecode, setImageToDecode] = useState(null);

    function modeHandler(mode) {
        setCodedMessageImage(null);
        setMessageImage(null);
        setImageToDecode(null);
        setDecodeMode('t');

        setTabValue(mode);
    };

    function submitHandler(e, endpoint){
        e.preventDefault();
        const captchaValue = captchaRef.current.getValue();

        if(captchaValue){
            captchaRef.current.reset();
            appCtx.popLoading(strings.loadingModal.processingImages[appCtx.language]);
            
            const formData = new FormData();
            formData.append('captchaValue', captchaValue);

            if(endpoint==='encode') {
                formData.append('coded', codedMessageImage);
                formData.append('img', messageImage);
                formData.append('filename', messageImage.name);
                
                api.encode(handleResponse, handleResults, handleError, appCtx.token, formData);

            } else if(endpoint==='decode') {
                formData.append('img', imageToDecode);
                formData.append('filename', imageToDecode.name)
                formData.append('mode', decodeMode)

                api.decode(handleResponse, handleResults, handleError, appCtx.token, formData);
            };
            
        }
        else{
            setInvalidCaptcha(true);
        };
    };

    function handleResponse(response) {
        const res = 'data:image/png;base64, ' + response.data.result;
        const resName = response.data.filename;

        appCtx.popLoading('');
        appCtx.popResult(res);

        return {
                fileData: res,
                fileName: resName
        };
    };

    function handleResults(results) {
        const link = document.createElement('a');
        link.href = results.fileData;

        link.setAttribute(
        'download',
        results.fileName,
        );
        
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    function handleError(e) {
        appCtx.popLoading('');
        errorHandlers.handleRestError(e, appCtx.raiseError);
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

    function onCaptchaChanged(value) {
        value ? setInvalidCaptcha(false) : setInvalidCaptcha(true);
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
                        <Button variant='outline-dark' onClick={(e) => submitHandler(e, 'encode')}
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
                        <Button variant='outline-dark' onClick={(e) => submitHandler(e, 'decode')}
                            disabled={imageToDecode ? false : true} 
                            className={classes.executeButton}>
                            {strings.modeToggler.buttonMessage.decode[appCtx.language]}
                        </Button>
                    </Row>
                </Container>
            </div>;
        };

        return <div>{strings.modeToggler.componentLoadingError[appCtx.language]}</div>;
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
        <div className={classes.captchaContainer}>
            <span hidden={!invalidCaptcha} className={classes.invalidCaptchaText}>{strings.modeToggler.invalidCaptchaMessage[appCtx.language]}</span>
            <ReCAPTCHA sitekey={config.siteKey} ref={captchaRef} onChange={onCaptchaChanged}/>
        </div>
    </div>;
};

export default ModeToggler;