import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { ValidationMessage } from "~/components/FormError";
import { MarkDownPreview } from "~/components/MarkDownPreview";
import { SelectItem } from "~/components/Select";
import { IPost } from "~/models/models";
import { validatePost } from "~/utils/utils";
import { sessionManager } from "./login";
import { PostService } from "~/repository/post.repository";

const postService = new PostService();

const sessionManager: SessionManager = new SessionManager();

export default function PostCreationForm() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const categoryOptions = [
    { key: "1", label: "Chat" },
    { key: "2", label: "StandAlone" },
    { key: "3", label: "Others" },
    { key: "4", label: "Blog" },
  ];

  const postType = [
    { key: "1", label: "Post" },
    { key: "2", label: "Draft" },
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

  const [activeTab, setActiveTab] = useState("write");

  return (
    <Container className="formTopMargin">
      <div>
        <Nav variant="tabs" defaultActiveKey="new-post" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="new-post">New post</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form method="post" className="needs-validation" encType="multipart/form-data" noValidate>
          <fieldset disabled={navigation.state === "submitting"}>
            <div className="mb-3 styled-dropdown">
              <SelectItem
                name="category"
                options={categoryOptions}
                onChange={handleCategorySelect}
                title="Select post category"
                error={actionData?.errors?.category}
              />
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
                placeholder="Post Title *"
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
                <a
                  className={`nav-link ${activeTab === "write" ? "active" : ""}`}
                  href="#write"
                  onClick={() => setActiveTab("write")}
                >
                  Be creative.
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "preview" ? "active" : ""}`}
                  href="#preview"
                  onClick={() => setActiveTab("preview")}
                >
                  Preview
                </a>
              </li>
              <li className="nav-item ms-auto">
                <a className="nav-link disabled" href="#saved">
                  <Check size={18} className="me-1" /> Saved
                </a>
              </li>
            </ul>

            {activeTab === "write" ? (
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
            ) : (
              <div className="mb-3">
                <MarkDownPreview markdown={postContent} />
              </div>
            )}

            <div className="mb-3 styled-dropdown">
              <SelectItem
                name="published"
                options={postType}
                onChange={handleCategorySelect}
                title="Select post type"
                error={actionData?.errors?.published}
              />
              {actionData?.errors.published ? (
                <ValidationMessage
                  error={actionData?.errors?.published}
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
    </Container>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const userId = await sessionManager.requireUserId(request);
    if (!userId) {
      return redirect("/");
    }
    const formData = await request.formData();
    const post = extractPostData(formData);
    const validationErrors = validatePost(post);

    if (hasErrors(validationErrors)) {
      return { errors: validationErrors };
    }
    await postService.createPost({ ...post, userId });
    return redirect("/");
  } catch (error) {
    console.error("Error creating post:", error);
    return { errors: { message: "Failed to create post" } };
  }
}

function extractPostData(formData: FormData): IPost {
  return {
    category: formData.get("category") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    file: formData.get("file") as string,
    published: formData.get("published") as string,
  };
}

function hasErrors(errors: { [key: string]: string }): boolean {
  return Object.values(errors).some((err) => err.length > 1);
}
