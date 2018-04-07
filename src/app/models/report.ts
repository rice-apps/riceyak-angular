import {User} from "./user";
import {Post} from "./post";

export class Report {
    reason: string;
    post: Post;
    author: User;
    reviewed: boolean;
}
