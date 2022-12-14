import config from '../configs/config.json';

import { useState, useContext } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import classes from './ModeToggler.module.css';

import ImageUpload from './ImageUpload';

import AppContext from '../store/app-context';

import strings from '../static/strings.js';
import errors from '../static/errors.js';

function ModeToggler(props){
    const appCtx = useContext(AppContext);

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
        appCtx.setLoadingText(strings.loadingModal.processingImages[appCtx.language]);
        appCtx.setShowLoading(true);
        
        const formData = new FormData();

        if(endpoint==='encode') {
            formData.append('coded', codedMessageImage);
            formData.append('img', messageImage);
            formData.append('filename', messageImage.name)

        } else if(endpoint==='decode') {
            formData.append('img', imageToDecode);
            formData.append('filename', imageToDecode.name)
            formData.append('mode', decodeMode)
        };
        
        axios.post(config.flaskServer + '/' + endpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => { 
            const res = 'data:image/png;base64, ' + response.data.result;
            const resName = response.data.filename;

            appCtx.setResult(res);
            appCtx.setLoadingText('');
            appCtx.setShowLoading(false); 
            appCtx.setShowResult(true);

            return {
                    fileData: res,
                    fileName: resName
            };
        })
        .then(results => {
            const link = document.createElement('a');
            link.href = results.fileData;

            link.setAttribute(
              'download',
              results.fileName,
            );
            
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(e => {
            let errorKey;

            if(e.response.status === 500) { 
                errorKey = e.response.data.error_codename;
            }
            else{
                errorKey = "unknown";
            };

            appCtx.setShowLoading(false);
            appCtx.setLoadingText('');
            appCtx.raiseError(errors[errorKey]);
            appCtx.setShowError(true);
        });
    };

    function decodeModeHandler(e, dMode) {
        e.preventDefault();
        setDecodeMode(dMode);
    };

    function imageToDecodeHandler(file) {
        setImageToDecode(file);
    };

    function codedMessageImageHandler(file)??{
        setCodedMessageImage(file);
    };

    function messageImageHandler(file) {
        setMessageImage(file);
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
    </div>;
};

export default ModeToggler;