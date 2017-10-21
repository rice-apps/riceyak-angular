import { Comment } from "./comment";

export class Post {
  title: string;
  body: string;
  score: number;
  date: Date;
  comments: Comment[];
}
