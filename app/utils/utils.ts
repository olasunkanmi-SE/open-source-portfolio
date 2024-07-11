import { IPost } from "~/models/models";

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
