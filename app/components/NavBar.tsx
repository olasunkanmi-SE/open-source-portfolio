import { Github } from "lucide-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchForm from "./SearchForm";

export const NavBar = () => {
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for", searchTerm);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Fiatinnovations</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
          <NavDropdown style={{ fontSize: "14px" }} title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#action1">
            Github <Github />
          </Nav.Link>
          <SearchForm
            onSearch={handleSearch}
            buttonText="Find"
            placeholder="Enter search term..."
            buttonVariant="primary"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
