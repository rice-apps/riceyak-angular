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
  votes: Object;
  private loading: boolean = true;
  private voteLoading: boolean = false;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.postService.getPosts()
      .then(posts => {
        this.loading = false;
        this.posts = posts;
        this.votes = {};
        this.getAllVotes();
      })
  }

  voteOnPost(post: Post, vote: number) {
    this.voteLoading = true;
    this.postService.voteOnPost(post._id, vote)
      .then(newPost => {
        this.voteLoading = false;
        let idx = this.posts.findIndex(p => p._id === newPost._id);
        this.posts[idx] = newPost;
        this.votes[newPost._id] = vote;
      });
  }

  getVoted(post: Post) {
    const userID = this.authService.userLoggedIn.user.userID; // TODO: Move into getAllVotes()
    const vote = post.votes.find(v => v.user === userID);
    return vote ? vote.vote : 0;
  }

  getAllVotes() {
    // const userID = this.authService.userLoggedIn.user.userID;
    this.posts.forEach(post => {
      this.votes[post._id] = this.getVoted(post);
    });
    console.log(this.votes)
  }
}
