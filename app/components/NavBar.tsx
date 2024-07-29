import { Link } from "@remix-run/react";
import { Github, LinkedinIcon, Settings } from "lucide-react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SearchModal } from "./Modal";
import SearchForm from "./SearchForm";

export const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Fiatinnovations</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
          <div className={`overlay ${showModal ? "active" : ""}`}></div>
          <SearchForm onSearch={handleShowModal} placeholder="Enter search term..." onClick={handleShowModal} />
          <SearchModal show={showModal} onHide={handleCloseModal} />
          <Nav.Link>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              Blog
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/resume">
              Resume
            </Link>
          </Nav.Link>
          <Nav.Link href="https://github.com/olasunkanmi-SE/" target="_blank">
            <Github />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/oyinlola-olasunkanmi-raymond-71b6b8aa/" target="_blank">
            <LinkedinIcon />
          </Nav.Link>
          <Nav.Link>
            <Settings />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
