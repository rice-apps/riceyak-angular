import { Comment } from './comment';
import {User} from './user';

export class Post {
  _id: string;
  title: string;
  body: string;
  score: number;
  date: Date;
  comments: Comment[];
  author: User;
  votes: [ { user: String, vote: Number } ];
  removed: boolean;
  reacts: {};
  reactCounts: {};
}
