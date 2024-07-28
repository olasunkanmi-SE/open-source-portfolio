import { Link } from "@remix-run/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { IPostDraft } from "~/models/models";

interface SidebarItemProps {
  label: string;
  children?: React.ReactNode;
  level?: number;
  to?: string;
}

interface Idraft {
  drafts: IPostDraft[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, children, level = 0, to }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<string | number>("0px");
  const contentRef = useRef<HTMLDivElement>(null);
  const hasChildren = React.Children.count(children) > 0;

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setHeight(isOpen ? "0px" : `${contentRef.current?.scrollHeight}px`);
  };

  const content = (
    <>
      <span>{label}</span>
      {hasChildren && (
        <span className={`chevron ${isOpen ? "open" : ""}`}>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </>
  );

  return (
    <Nav.Item className="w-100">
      {to ? (
        <Link
          to={to}
          className={`nav-link d-flex align-items-center justify-content-between sidebar-item level-${level}`}
        >
          {content}
        </Link>
      ) : (
        <Nav.Link
          onClick={hasChildren ? toggleOpen : undefined}
          className={`d-flex align-items-center justify-content-between sidebar-item level-${level}`}
        >
          {content}
        </Nav.Link>
      )}
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

export default function Sidebar({ drafts }: Idraft) {
  return (
    <div className="sidebar">
      <Nav className="flex-column w-100">
        <SidebarItem label="Why Code Buddy" />
        <SidebarItem label="Feature Guide" />
        <SidebarItem label="Overview" />
        <SidebarItem label="Actions">
          <SidebarItem label="Explain" level={1} />
          <SidebarItem label="Refactor" level={1} />
          <SidebarItem label="Optimize" level={1} />
          <SidebarItem label="Send to Ola" level={1} />
        </SidebarItem>
        <SidebarItem label="Drafts">
          {drafts.map((draft: IPostDraft) => (
            <SidebarItem key={`draft-${draft.id}`} to={`./drafts/${draft.id}`} label={draft.title} level={1} />
          ))}
        </SidebarItem>
      </Nav>
    </div>
  );
}
