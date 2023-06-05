export interface Post {
  id: number;
  title: string;
  body: string;
  topic: string;
  author: string;
  date: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}
