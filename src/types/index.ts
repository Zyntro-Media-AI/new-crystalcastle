export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  featured?: boolean;
}

export type Category =
  | "All"
  | "Remote Work"
  | "4-Day Week"
  | "Async Culture"
  | "Leadership"
  | "Productivity"
  | "Wellbeing";
