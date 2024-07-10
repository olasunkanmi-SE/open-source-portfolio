import { Github } from "lucide-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchForm from "./SearchForm";
import CustomDropdown from "./DropDown";
import { useState } from "react";

export const NavBar = () => {
  const [selectedProduct, setSelectedProduct] = useState("product");
  const categoryOptions = [
    { key: "1", label: "CodeBuddy" },
    { key: "2", label: "Intellisearch" },
    { key: "3", label: "Reataurant" },
  ];

  const handleCategorySelect = (selectedOption: { key: string; label: string; href?: string }) => {
    setSelectedProduct(selectedOption.label);
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
            toggleText={selectedProduct}
            variant="transparent"
          />
          <Nav.Link href="#action1">
            Github <Github />
          </Nav.Link>
          <SearchForm onSearch={handleSearch} placeholder="Enter search term..." />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
