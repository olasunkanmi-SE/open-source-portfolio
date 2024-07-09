import { AtSign, Check, Image, MessageSquare, Paperclip } from "lucide-react";
import { useState } from "react";
import { Button, Container, Dropdown, Form, Nav } from "react-bootstrap";

const formWrapperStyle = {
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
  padding: "20px",
  marginTop: "20px",
};

const PostCreationForm = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  return (
    <Container className="mt-3">
      <div style={formWrapperStyle}>
        <Nav variant="tabs" defaultActiveKey="new-post" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="new-post">New post</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="share-link">Share a link</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" id="dropdown-squad">
              Select post Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Chat</Dropdown.Item>
              <Dropdown.Item href="#/action-2">StandAlone</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Others</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="mb-3">
            <Button variant="outline-secondary" className="d-flex align-items-center">
              <Image size={18} className="me-2" /> Thumbnail
            </Button>
          </div>

          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Control
              type="text"
              placeholder="Post Title*"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <Form.Text className="text-muted float-end">{postTitle.length}/250</Form.Text>
          </Form.Group>

          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="write">Write</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="preview">Preview</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ms-auto">
              <Nav.Link disabled>
                <Check size={18} className="me-1" /> Saved
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Form.Group className="mb-3" controlId="postContent">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Share your thoughts"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button variant="link" className="text-muted p-0 me-2">
                <Paperclip size={18} />
              </Button>
              <Button variant="link" className="text-muted p-0 me-2">
                <AtSign size={18} />
              </Button>
              <Button variant="link" className="text-muted p-0">
                <MessageSquare size={18} />
              </Button>
            </div>
            <Button variant="dark">Post</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default PostCreationForm;
