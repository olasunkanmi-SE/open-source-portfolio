import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, placeholder = "Search" }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ fontSize: "14px", fontWeight: 300 }} className="d-flex">
      <Form.Control
        type="search"
        placeholder={placeholder}
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />
    </Form>
  );
};

export default SearchForm;
