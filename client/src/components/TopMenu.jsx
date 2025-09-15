import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../css/TopMenu.css";

const TopMenu = () => {
  return (
    <Navbar expand="lg" className="top-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/About">About</Nav.Link>
            <Nav.Link as={NavLink} to="/Doctors">Doctors</Nav.Link>
            <Nav.Link as={NavLink} to="/Appointments">Appointments</Nav.Link>
            <Nav.Link as={NavLink} to="/Contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopMenu;
