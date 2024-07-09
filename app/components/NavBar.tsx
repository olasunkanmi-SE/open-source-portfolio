import { Github } from "lucide-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchForm from "./SearchForm";
import CustomDropdown from "./DropDown";

export const NavBar = () => {
  const categoryOptions = [
    { key: "1", label: "CodeBuddy", href: "#/action-1" },
    { key: "2", label: "Intellisearch", href: "#/action-2" },
    { key: "3", label: "Reataurant", href: "#/action-3" },
  ];

  const handleCategorySelect = (selectedOption: { key: string; label: string; href?: string }) => {
    console.log("Selected category:", selectedOption.label);
    // Handle the selection here
  };
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
          <CustomDropdown
            className="mb-1"
            options={categoryOptions}
            onSelect={handleCategorySelect}
            toggleText="Products"
            variant="transparent"
          />
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
