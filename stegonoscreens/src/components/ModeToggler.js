import { useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ImageUpload from "./ImageUpload";

import AppContext from '../store/app-context';

import strings from '../static/strings.js';

function ModeToggler(props){
    const appCtx = useContext(AppContext);

    const [tabValue, setTabValue] = useState('encode'); 
    const [decodeMode, setDecodeMode] = useState('t');

    function modeHandler(mode) {
        setTabValue(mode);
    };

    function decodeModeHandler(e, dMode) {
        e.preventDefault();
        setDecodeMode(dMode);
    };

    function renderComponent() {
        if(tabValue==='encode') {
            return <Container>
                <Row>
                    <Col>
                        <ImageUpload message={strings.modeToggler.messageImageMessage[appCtx.language]}/>
                    </Col>
                    <Col>
                        <ImageUpload message={strings.modeToggler.toCodeImageMessage[appCtx.language]}/>
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
                            <ImageUpload message={strings.modeToggler.toDecodeImageMessage[appCtx.language]}/>
                        </Col>
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