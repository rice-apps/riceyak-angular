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

  /**
   * Array of all posts.
   */
  posts: Post[];

  /**
   * Maps each post._id to the user's vote for that post.
   */
  userVotes: Object;

  /**
   * Is true iff the page is loading posts.
   */
  private loading: boolean = true;

  /**
   * Is true iff the page is voting.
   * TODO: Use this value to animate pagewide vote loading, or create a new
   * value for a per-post voting basis.
   */
  private voteLoading: boolean = false;

  constructor(private postService: PostService, private authService: AuthService) { }

  /**
   * Gets all the posts, loads them into the array, and gets the user's vote
   * for each post.
   */
  ngOnInit() {
    let curUser = JSON.parse(localStorage.getItem('currentUser'));
    if (curUser.user.isNew) {
      $('#agreementModal').modal('show');
      curUser.user.isNew = false;
      localStorage.setItem('currentUser', JSON.stringify(curUser));
    }

    this.postService.getPosts()
      .then(posts => {
        this.loading = false;
        this.posts = posts;
        this.getAllVotes();
      });
  }

  /**
   * Sends a request to change the user's vote for a given post to a given vote
   * value.
   * TODO: Consider updating userVotes with the actual vote in newPost, instead
   * of what we expect it to be.
   */
  voteOnPost(post: Post, vote: number) {
      if (post._id in this.userVotes && this.userVotes[post._id] == vote){
          vote = 0;
      }
    this.voteLoading = true;
    this.postService.voteOnPost(post._id, vote)
      .then(newPost => {
        this.voteLoading = false;
        let idx = this.posts.findIndex(p => p._id === newPost._id);
        this.posts[idx] = newPost;
        this.userVotes[newPost._id] = vote;
        // TODO: Use the actual vote in newPost
      });
  }

  /**
   * Initializes this.userVotes as a mapping for each post, from its ID to
   * the user's vote on that post.
   */
  getAllVotes() {
    this.userVotes = {};
    const userID = this.authService.userLoggedIn.user.userID;
    this.posts.forEach(post => {
      const vote = post.votes.find(v => v.user === userID);
      this.userVotes[post._id] = vote ? vote.vote : 0;
    });
  }
}
