import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post-service/post.service";
import {Post} from "../../models/post";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../../models/comment";
import {User} from "../../models/user";
import {Location} from '@angular/common';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  /**
   * The Post displayed in detail by the component.
   */
  private post: Post;

  /**
   * The user's vote for this Post.
   */
  userVote: Number;

  /**
   * Is true iff the user created this post.
   */
  private isMyPost: boolean = false;

  private isEdit: boolean = false;

    constructor(private postService: PostService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postService.getPost(params['_id'])
        .then(post => this.initPostStatus(post));
    });
  }

  initPostStatus(post: Post){
    this.post = post;
    this.userVote = this.getVoted();
    if (this.authService.userLoggedIn) {

        if (this.authService.userLoggedIn.user.userID === this.post.author._id) {
            this.isMyPost = true;
        } else {
            this.isMyPost = false;
        }
    }
    else {
        this.isMyPost = false;
    }
  }

  deletePost(){
    this.postService.delete(this.post._id);
    this.router.navigate(['/posts']);
  }
  comment(comment_entered: string) {

      this.postService.postComment(this.post._id, comment_entered)
          .then(post => this.post = post);
  }

  /**
   * Sends a request to change the user's vote to a given vote value.
   */
  voteOnPost(vote) {
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

  edit(){
    this.isEdit=!this.isEdit;
  }

  submitChanges(title: string, body: string){
    this.post.title = title.trim();
    this.post.body = body;
    this.edit();
    this.postService.edit(this.post._id, this.post);
  }


}


