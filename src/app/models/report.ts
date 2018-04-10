import {User} from './user';
import {Post} from './post';

export class Report {
    _id: string;
    reason: string;
    post: Post;
    author: User;
    reviewed: boolean;
}
