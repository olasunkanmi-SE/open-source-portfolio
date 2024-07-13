import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { ValidationMessage } from "~/components/FormError";
import SearchComponent from "~/components/Search";
import { IPost } from "~/models/models";
import { validatePost } from "~/utils/utils";

export default function PostCreationForm() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
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

  useEffect(() => {
    return () => {
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
    };
  }, [uploadedImageUrl]);

  return (
    <Container className="mt-3">
      <div className="formWrapperStyle">
        <Nav variant="tabs" defaultActiveKey="new-post" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="new-post">New post</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form method="post" className="needs-validation" encType="multipart/form-data" noValidate>
          <fieldset disabled={navigation.state === "submitting"}>
            <div className="mb-3 styled-dropdown">
              <select
                name="category"
                className="form-select"
                onChange={(e) => handleCategorySelect(e.target.value)}
                style={{
                  borderColor: actionData?.errors?.category ? "red" : "",
                }}
              >
                <option>Select post category</option>
                {categoryOptions.map((option) => (
                  <option key={option.key} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              {actionData?.errors.category ? (
                <ValidationMessage
                  error={actionData?.errors?.category}
                  isSubmitting={navigation.state === "submitting"}
                />
              ) : null}
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
                style={{
                  borderColor: actionData?.errors?.title ? "red" : "",
                }}
              />
              {actionData?.errors.title ? (
                <ValidationMessage error={actionData?.errors?.title} isSubmitting={navigation.state === "submitting"} />
              ) : null}
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
                style={{
                  borderColor: actionData?.errors?.content ? "red" : "",
                }}
              ></textarea>

              {actionData?.errors.content ? (
                <ValidationMessage
                  error={actionData?.errors?.content}
                  isSubmitting={navigation.state === "submitting"}
                />
              ) : null}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <input
                  name="file"
                  type="file"
                  className="form-control"
                  onChange={handleUploadSuccess}
                  accept="image/*"
                />
                {uploadedImageUrl && (
                  <div>
                    <h3>Uploaded Image:</h3>
                    <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-dark">
                Post
              </button>
            </div>
          </fieldset>
        </Form>
      </div>
      <SearchComponent />
    </Container>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const post: IPost = {
    category: formData.get("category") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    file: formData.get("file") as string,
  };
  const errors: { [key: string]: string } = validatePost(post);
  if (Object.values(errors).some((err) => err.length > 1)) {
    console.log(errors);
    return { errors };
  }
  return redirect("/");
}
