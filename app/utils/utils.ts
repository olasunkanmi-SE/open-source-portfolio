import { IPost } from "~/models/models";

const DEFAULT_REDIRECT = "/";

export const validatePost = (post: IPost) => {
  const error: { [key: string]: string } = {};

  Object.entries(post).forEach(([key, value]) => {
    switch (key) {
      case "category":
        if (value === "Select post category") {
          error[key] = "Select a category";
        }
        break;
      case "title":
        if (!value.length) {
          error[key] = "Enter the post title";
        } else if (value.length < 3) {
          error[key] = "Post title is too short";
        }
        break;
      case "content":
        if (!value.length) {
          error[key] = "Enter your post content";
        } else if (value.length < 3) {
          error[key] = "Post content is too short";
        }
        break;
      default:
    }
  });
  return error;
};

export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
