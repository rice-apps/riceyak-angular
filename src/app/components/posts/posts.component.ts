import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service/post.service";
import {Router} from "@angular/router";
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  private loading: boolean = true;
  private voteLoading: boolean = false;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.postService.getPosts()
      .then(posts => {
        this.loading = false;
        this.posts = posts;
      })
  }

  voteOnPost(post: Post, vote: number) {
    this.voteLoading = true;
    this.postService.voteOnPost(post._id, vote)
      .then(newPost => {
        this.voteLoading = false;
        let idx = this.posts.findIndex(p => p._id === newPost._id);
        this.posts[idx] = newPost;
      });
  }

  //getVoted(post: Post) {
  //  this.authService.loggedInUser.subscribe(u => {
  //    post.votes.forEach(v => {
  //      if (v.user === u.user.userID) {
  //        return v.vote;
  //      }
  //    });
  //    return 0;
  //  });
  //}
}
