import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import ImageUpload from "./ImageUpload";

function ModeToggler(props){
    const [tabValue, setTabValue] = useState('encode'); 

    function renderComponent() {
        if(tabValue==='encode') {
            return <Container>
                <Row>
                    <Col>
                        <ImageUpload message='Upload the image that has your coded message:'/>
                    </Col>
                    <Col>
                        <ImageUpload message='Upload image to be encoded:'/>
                    </Col>
                </Row>
            </Container>;
        }

        else if(tabValue==='decode') {
            return  <Container>
                <Row>
                    <Col>
                        <ImageUpload message='Upload the image you wish to decode:'/>
                    </Col>
                </Row>
            </Container>;
        };

        return <div>Error loading component</div>;
    };

    function modeHandler(mode){
        setTabValue(mode);
    };

    return <div>
        <Nav variant='tabs' defaultActiveKey={tabValue} onSelect={modeHandler}>
            <Nav.Item>
                <Nav.Link eventKey='encode'>Encode</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='decode'>Decode</Nav.Link>
            </Nav.Item>
        </Nav>
        { renderComponent() }
    </div>;
};

export default ModeToggler;