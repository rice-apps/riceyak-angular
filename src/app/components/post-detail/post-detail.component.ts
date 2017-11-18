import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post-service/post.service";
import {Post} from "../../models/post";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../models/comment";
import {User} from "../../models/user";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  show: boolean;

  private isMyPost: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.postService.getPost(params['_id'])
        .then(post => this.post = post);
    });
    if (this.authService.userLoggedIn) {
      if (this.authService.userLoggedIn.user.userID = this.post.author._id) {
        this.isMyPost = true;
      } else {
        this.isMyPost = false;
      }
    } else {
      this.isMyPost = false;
    }
  }
  
  Comment(comment_entered: string) {
      this.postService.postComment(this.post._id, comment_entered)
          .then(post => this.post = post);
  }
}