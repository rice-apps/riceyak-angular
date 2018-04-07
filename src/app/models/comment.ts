import {User} from './user';

export class Comment {
  _id: string;
  body: string;
  score: number;
  date: Date;
  author: User;
  votes: [ { user: String, vote: Number } ];
}
