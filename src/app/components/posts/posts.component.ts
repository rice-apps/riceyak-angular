import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service/post.service";
import {Router} from "@angular/router";
import { AuthService } from '../../services/auth-service/auth.service';
import {reactCss} from "../../models/react";

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
  userReacts: Object;
  reactCounts: Object;

    /**
     *  get reacts map
     */

  reactCss: Object;
  /**
   * Is true iff the page is loading posts.
   */
  private loading: boolean = true;

  /**
   * Is true iff the page is voting.
   * TODO: Use this value to animate pagewide vote loading, or create a new
   *       value for a per-post voting basis.
   */
  private voteLoading: boolean = false;

    constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    /**
     * Gets all the posts, loads them into the array, and gets the user's vote
     * for each post.
     */
    this.reactCss = reactCss
    this.postService.getPosts()
      .then(posts => {
        this.loading = false;
        this.posts = posts;
        this.getAllVotes();
        this.getAllReacts();
      })
  }

  /**
   * Sends a request to change the user's vote for a given post to a given vote
   * value.
   * TODO: Consider updating userVotes with the actual vote in newPost, instead
   * of what we expect it to be.
   */
  voteOnPost(post: Post, vote: number) {
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

  getAllReacts(){
    this.userReacts = {}
    this.reactCounts = {}
    const userID = this.authService.userLoggedIn.user.userID
    this.posts.forEach(post => {
        const react = post.reacts.hasOwnProperty(userID) ? post.reacts[userID] : null
        this.userReacts[post._id] = react;
        this.reactCounts[post._id] = post.reactCounts;
    })
  }
  private changeReact(emote: string, post_id: string){
      if (this.userReacts[post_id] === emote) {
          this.reactCounts[post_id][emote] -= 1;
          this.userReacts[post_id] = null;
      }
      else {
          if (this.userReacts[post_id] != null) this.reactCounts[post_id][this.userReacts[post_id]] -= 1;
          this.userReacts[post_id] = emote;
          this.reactCounts[post_id][emote] += 1;
      }
      this.postService.reactOnPost(post_id, emote);
    }

  objectKeys(obj: Object){
    return Object.keys(obj)
  }

}
