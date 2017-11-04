import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service/post.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../models/comment";
import {COMMENTS} from "../../models/comments_dummy";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  comments = COMMENTS;
  constructor(
      private postService: PostService,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(params => {
          this.postService.getPost(params['id'])
              .then(post => this.post = post);
      });
    // this.comments = this.post.comments;
    }
  }


