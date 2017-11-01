import { Comment } from "./comment";

export class Post {
  _id: string;
  title: string;
  body: string;
  score: number;
  date: Date;
  comments: Comment[];
}
