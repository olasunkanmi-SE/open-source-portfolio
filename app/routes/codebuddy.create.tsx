import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";

export default function PostCreationForm() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const categoryOptions = [
    { key: "1", label: "Chat", href: "#/action-1" },
    { key: "2", label: "StandAlone", href: "#/action-2" },
    { key: "3", label: "Others", href: "#/action-3" },
  ];

  const handleCategorySelect = (key: string) => {
    return key;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (event: any) => {
    const file = event.target.files?.[0];
    const url = URL.createObjectURL(file);
    setUploadedImageUrl(url);
    if (!file) return;
    console.log(file);
  };

  return (
    <Container className="mt-3">
      <div className="formWrapperStyle">
        <Nav variant="tabs" defaultActiveKey="new-post" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="new-post">New post</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form method="post" className="needs-validation" noValidate>
          <div className="mb-3 styled-dropdown">
            <select
              name="category"
              className="form-select"
              onChange={(e) => handleCategorySelect(e.target.value)}
            >
              <option>Select post Category</option>
              {categoryOptions.map((option) => (
                <option key={option.key} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <input
              name="title"
              type="text"
              className="form-control"
              id="postTitle"
              placeholder="Post Title*"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />
            <div className="form-text text-end">{postTitle.length}/250</div>
          </div>

          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <a className="nav-link active" href="#write">
                Be creative.
              </a>
            </li>
            <li className="nav-item ms-auto">
              <a className="nav-link disabled" href="#saved">
                <Check size={18} className="me-1" /> Saved
              </a>
            </li>
          </ul>

          <div className="mb-3">
            <textarea
              name="content"
              className="form-control"
              id="postContent"
              rows={3}
              placeholder="Share your thoughts"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <input
                name="file"
                type="file"
                className="form-control"
                onChange={handleUploadSuccess}
              />
              {uploadedImageUrl && (
                <div>
                  <h3>Uploaded Image:</h3>
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded"
                    style={{ maxWidth: "300px" }}
                  />
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-dark">
              Post
            </button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);
  return formData;
}
