import React from "react";
import { Dropdown } from "react-bootstrap";

interface DropdownOption {
  key: string;
  label: string;
  href?: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  onSelect: (selectedOption: DropdownOption) => void;
  toggleText?: string;
  variant?: string;
  id?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  toggleText = "Select post Category",
  variant = "light",
  id = "dropdown-custom",
  className = "mb-3",
}) => {
  const handleSelect = (eventKey: string | null) => {
    const selectedOption = options.find((option) => option.key === eventKey);
    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <Dropdown className={className} onSelect={handleSelect}>
      <Dropdown.Toggle variant={variant} id={id}>
        {toggleText}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item key={option.key} eventKey={option.key} href={option.href}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
