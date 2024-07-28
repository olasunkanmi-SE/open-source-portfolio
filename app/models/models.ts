export interface IPost {
  category: string;
  content: string;
  title: string;
  file?: string;
  published: string | boolean;
  userId?: string;
}

export interface IPostDraft {
  id: number;
  title: string;
  content: string;
}
