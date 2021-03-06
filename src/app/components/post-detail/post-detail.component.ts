import {AuthService} from './../../services/auth-service/auth.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../../services/post-service/post.service';
import {Post} from '../../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from '../../models/comment';

import {reactCss} from '../../models/react';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @ViewChild('reportPopover') popover: ElementRef;

  /**
   * The Post displayed in detail by the component.
   */
  post: Post;

  reactCss: Object;
  /**
   * The user's vote and react for this Post.
   */
  private userVote: Number;
  private userReact: string;
  /**
   * Is true if the user created this post.
   */
  isMyPost = false;

  /**
   * True if the user has toggled the edit button 'on.'
   */
  isEdit = false;

  /**
   * True if the request to retrieve this post has not completed yet.
   */
  loading = true;

  editLoading = false;

  errorText: string;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  /**
   * Init lifecycle hook. Retrieves data.
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postService.getPost(params['_id'])
        .then(post => {
          this.initPostStatus(post);
          this.loading = false;
        });
    });
  }

  /**
   * Helper fn for initializing the component.
   * @param {Post} post - post object
   */
  initPostStatus(post: Post) {
    this.post = post;
    this.userVote = this.getVoted();
    this.userReact = this.getReacted();
    this.reactCss = reactCss;

    if (this.authService.userLoggedIn) {
      this.isMyPost = this.authService.userLoggedIn.user.userID === this.post.author._id;
    } else {
      this.isMyPost = false;
    }
  }

  /**
   * Deletes the post
   */
  deletePost() {
    this.postService.deletePost(this.post._id)
      .then(() => this.router.navigate(['/posts']));
  }

  /**
   * Comments on the post
   * @param {string} comment_entered
   */
  commentOnPost(comment_entered: string) {
    this.postService.postComment(this.post._id, comment_entered)
      .catch(err => {
        if (err.status == 429) {
          this.errorText = 'You are commenting too much. Please try again later.';
        }
      })
      .then(post => {
        this.post = post;
      });
  }

  /**
   * Sends a request to change the user's vote to a given vote value.
   */
  voteOnPost(vote) {
    if (this.userVote == vote) {
      vote = 0;
    }
    this.postService.voteOnPost(this.post._id, vote)
      .then(res => {
        this.post = res;
        this.userVote = vote;
      });
  }

  reactOnPost(post: Post, react: string) {
    this.userReact = react;
    this.postService.reactOnPost(this.post._id, react)
      .then(res => {
        this.post = res;
      });
  }

  voteOnComment(vote, comment) {
    if (this.getVotedComment(comment) === vote) {
      vote = 0;
    }
    this.postService.voteOnComment(comment._id, this.post._id, vote)
      .then(res => {
        this.post = res;
        // comment.userVote = vote;
      });
  }

  /**
   * Returns the user's vote on Post.
   */
  getVoted() {
    const userID = this.authService.userLoggedIn.user.userID;
    const vote = this.post.votes.find(v => v.user === userID);
    return vote ? vote.vote : 0;
  }

  getVotedComment(comment: Comment) {
    const userID = this.authService.userLoggedIn.user.userID;
    const vote = comment.votes.find(v => v.user === userID);
    return vote ? vote.vote : 0;
  }

  /**
   * Submits changes to the post.
   */
  submitChanges() {
    this.post.title = this.post.title.trim();
    this.editLoading = true;
    this.postService.editPost(this.post._id, this.post)
      .then(() => {
        this.editLoading = false;
        this.isEdit = !this.isEdit;
      });
  }

  /**
   * Report this post
   */
  postReport(reason: string) {
    this.postService.postReport(this.post._id, reason)
      .then(post => {
        this.post = post;
      });
  }

  private changeReact(emote: string) {
    if (this.userReact === emote) {
      this.post.reactCounts[this.userReact] -= 1;
      this.userReact = null;
    } else {
      if (this.userReact != null) {
        this.post.reactCounts[this.userReact] -= 1;
      }
      this.userReact = emote;
      this.post.reactCounts[emote] += 1;
    }
    this.postService.reactOnPost(this.post._id, emote);
  }

  /**
   * Returns the user's react
   */
  private getReacted() {
    const userID = this.authService.userLoggedIn.user.userID;
    this.userReact = this.post.reacts.hasOwnProperty(userID) ? this.post.reacts[userID] : null;
    return this.userReact;
  }

  objectKeys(obj: Object) {
    return Object.keys(obj);
  }
}
