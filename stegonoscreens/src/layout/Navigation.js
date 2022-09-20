import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import classes from './Navigation.module.css';
import logo from '../static/stegologo.svg';

import AppContext from '../store/app-context';

import strings from '../static/strings';

function Navigation(){
    const appCtx = useContext(AppContext);

    function languageHandler(lang) {
        appCtx.changeLanguage(lang);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className='text-white font-weight-bold'>
                    <img src={logo} alt='Logo' className={classes.logo}
                    height="60em" width="60em"/>
                    Stegonosaurus
                </Navbar.Brand>
                <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    {strings.navItems.map(navItem => 
                        <Nav key={navItem.key}>
                            <Nav.Link>
                                <Link className={classes.navItem} to={navItem.path}>{navItem.name[appCtx.language]}</Link>
                            </Nav.Link>
                        </Nav>
                    )}
                    <Nav>
                        <NavDropdown menuVariant='dark' title='Language' onSelect={languageHandler}>
                            <NavDropdown.Item eventKey='en' active={appCtx.language === 'en'}>English</NavDropdown.Item>
                            <NavDropdown.Item eventKey='es'active={appCtx.language === 'es'}>Español</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;