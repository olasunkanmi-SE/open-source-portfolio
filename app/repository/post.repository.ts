/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "~/db.server";
import { IPost } from "~/models/models";

export class PostService {
  async createPost(post: IPost) {
    try {
      const { title, category, content, published, userId } = post;
      const newPost = await prisma.post.create({
        data: {
          title,
          category,
          content,
          published: published === "Post" ? true : false,
          author: {
            connect: {
              id: Number(userId),
            },
          },
        },
      });
      if (!newPost) {
        throw new Error("Error while creating post");
      }
    } catch (error: any) {
      console.log(error);
      throw Error(error);
    }
  }

  async getDrafts(userId: number): Promise<{ id: number; title: string; content: string }[]> {
    try {
      const drafts = await prisma.post.findMany({
        where: { published: false, authorId: userId },
        select: { id: true, title: true, content: true },
      });
      return drafts;
    } catch (error: any) {
      console.log(error);
      throw Error(error);
    }
  }

  async getDraftById(userId: number, draftId: number): Promise<{ id: number; title: string; content: string } | null> {
    try {
      const drafts = await prisma.post.findFirst({
        where: { published: false, authorId: userId, id: draftId },
        select: { id: true, title: true, content: true },
      });
      return drafts;
    } catch (error: any) {
      console.log(error);
      throw Error(error);
    }
  }
}
