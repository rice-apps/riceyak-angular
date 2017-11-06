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

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.postService.getPost(params['_id'])
        .then(post => this.post = post);
    });

  }
  
  Comment(comment_entered: string) {

      this.route.params.subscribe(params => {
          this.postService.postComment(params['_id'], comment_entered)
              .then(post => this.post = post);
  });
}
}