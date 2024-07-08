import React, { useState, useRef } from "react";
import { Nav } from "react-bootstrap";
import { ChevronRight, ChevronDown } from "lucide-react";

interface SidebarItemProps {
  label: string;
  children?: React.ReactNode;
  level?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, children, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<string | number>("0px");
  const contentRef = useRef<HTMLDivElement>(null);
  const hasChildren = React.Children.count(children) > 0;

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setHeight(isOpen ? "0px" : `${contentRef.current?.scrollHeight}px`);
  };

  return (
    <Nav.Item className="w-100">
      <Nav.Link
        onClick={hasChildren ? toggleOpen : undefined}
        className={`d-flex align-items-center justify-content-between sidebar-item level-${level}`}
      >
        <span>{label}</span>
        {hasChildren && (
          <span className={`chevron ${isOpen ? "open" : ""}`}>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </Nav.Link>
      {hasChildren && (
        <div className="submenu-container" style={{ height }}>
          <Nav className="flex-column" ref={contentRef}>
            {children}
          </Nav>
        </div>
      )}
    </Nav.Item>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar ">
      <Nav className="flex-column w-100">
        <SidebarItem label="CODEBUDDY" />
        <SidebarItem label="Feature Guide" />
        <SidebarItem label="Overview" />
        <SidebarItem label="Chat">
          <SidebarItem label="Explain" level={1} />
          <SidebarItem label="Refactor" level={1} />
          <SidebarItem label="Optimize" level={1} />
          <SidebarItem label="Send to Ola" level={1} />
        </SidebarItem>
      </Nav>
    </div>
  );
};

export default Sidebar;
