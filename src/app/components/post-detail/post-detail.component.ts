import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post-service/post.service";
import {Post} from "../../models/post";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../models/comment";
import {stringify} from "querystring";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  private post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.postService.getPost(params['_id'])
        .then(post => this.post = post);
    });
  }
  
  Comment(comment_entered: string) {
      let comment: Comment = {
          body: comment_entered,
          score: 0,
      };
      this.route.params.subscribe(params => {
          this.postService.postComment(params['_id'], comment)
              .then(post => this.post = post);
  })};
}