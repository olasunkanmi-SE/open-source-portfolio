import { prisma } from "~/db.server";
import { IPost } from "~/models/models";

export async function createPost(post: IPost) {
  try {
    const { title, category, content, published } = post;
    const newPost = await prisma.post.create({
      data: {
        title,
        category,
        content,
        published: published === "Post" ? true : false,
        author: {
          connect: {
            id: 123,
          },
        },
      },
    });
    if (!newPost) {
      throw new Error("Error while creating post");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
}
