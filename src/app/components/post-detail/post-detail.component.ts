import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post-service/post.service";
import {Post} from "../../models/post";
import {ActivatedRoute} from "@angular/router";

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
      if(comment_entered)
      this.route.params.subscribe(params => {
          this.postService.postComment(params['_id'], comment_entered)
              .then(post => {
                  this.post = post
              });
  })};
}
