import { useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

import classes from "./style/Navigation.module.css";
import logo from "../static/images/stegologo.svg";

import AppContext from "../store/app-context";

import strings from "../static/strings";

function Navigation() {
  const appCtx = useContext(AppContext);

  function languageHandler(lang) {
    appCtx.changeLanguage(lang);
    localStorage.setItem("stegoLang", lang);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="text-white font-weight-bold">
          <img
            src={logo}
            alt="Logo"
            className={classes.logo}
            height="60em"
            width="60em"
          />
          Stegonosaurus-Rex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          {strings.navItems.map((navItem) => (
            <Nav key={navItem.key}>
              <Nav.Link className={classes.navItem} href={navItem.path}>
                {navItem.name[appCtx.language]}
              </Nav.Link>
            </Nav>
          ))}
          <Nav>
            <NavDropdown
              menuVariant="dark"
              title={strings.languageControl.label[appCtx.language]}
              onSelect={languageHandler}
            >
              {strings.languageControl.languages.map((lang) => (
                <NavDropdown.Item
                  key={lang.key}
                  eventKey={lang.value}
                  active={appCtx.language === lang.key}
                >
                  <img
                    src={lang.flagPointer}
                    alt={lang.flagAlt}
                    className={classes.langFlag}
                  />
                  {lang.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
