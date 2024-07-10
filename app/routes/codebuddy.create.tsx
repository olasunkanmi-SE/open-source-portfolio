import { Check } from "lucide-react";
import { useState } from "react";
import { Button, Container, Form, Nav } from "react-bootstrap";
import CustomDropdown from "~/components/DropDown";
import ImageUploader from "~/components/ImageUploader";

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
  const [selectedCategory, setSelectedCategory] = useState("Select Category");

  // Todo this list should come from post category from DB
  const categoryOptions = [
    { key: "1", label: "Chat" },
    { key: "2", label: "StandAlone" },
    { key: "3", label: "Others" },
  ];

  const handleCategorySelect = (selectedOption: { key: string; label: string; href?: string }) => {
    setSelectedCategory(selectedOption.label);
  };

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUploadSuccess = (url: string) => {
    setUploadedImageUrl(url);
    console.log("Image uploaded successfully:", url);
  };

  //Todo check error handling in Remix
  const handleUploadError = (error: Error) => {
    console.error("Image upload failed:", error);
  };

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
          <CustomDropdown options={categoryOptions} onSelect={handleCategorySelect} toggleText={selectedCategory} />
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
              <ImageUploader onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />
              {uploadedImageUrl && (
                <div>
                  <p>Uploaded Image:</p>
                  <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
                </div>
              )}
            </div>
            <Button variant="dark">Post</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default PostCreationForm;
