import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  private loading: boolean = true;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .then(posts => {
        this.loading = false;
        this.posts = posts;
      })
  }
}