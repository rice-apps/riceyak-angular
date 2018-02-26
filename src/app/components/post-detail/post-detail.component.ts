import {AuthService} from './../../services/auth-service/auth.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../services/post-service/post.service";
import {Post} from "../../models/post";
import {ActivatedRoute, Router} from "@angular/router";

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

  /**
   * The user's vote for this Post.
   */
  userVote: Number;

  /**
   * Is true if the user created this post.
   */
  isMyPost: boolean = false;

  /**
   * True if the user has toggled the edit button 'on.'
   */
  isEdit: boolean = false;

  /**
   * True if the request to retrieve this post has not completed yet.
   */
  loading: boolean = true;

  editLoading: boolean = false;

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
    if (this.authService.userLoggedIn) {
      this.isMyPost = this.authService.userLoggedIn.user.userID === this.post.author._id;
    }
    else {
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
      .then(post => this.post = post);
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

  /**
   * Returns the user's vote on Post.
   */
  getVoted() {
    const userID = this.authService.userLoggedIn.user.userID;
    const vote = this.post.votes.find(v => v.user === userID);
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
}


