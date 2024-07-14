import { Github } from "lucide-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchForm from "./SearchForm";
import { SearchModal } from "./Modal";
import { useState } from "react";

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
          <Nav.Link href="#action1">
            <Github />
          </Nav.Link>
          <div className={`overlay ${showModal ? "active" : ""}`}></div>
          <SearchForm onSearch={handleShowModal} placeholder="Enter search term..." onClick={handleShowModal} />
          <SearchModal show={showModal} onHide={handleCloseModal} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
