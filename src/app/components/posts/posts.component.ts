import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post-service/post.service';
import {AuthService} from '../../services/auth-service/auth.service';
import {reactCss} from '../../models/react';
import {CookieService} from "ngx-cookie";

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
  loading = true;

  /**
   * Is true iff the page is voting.
   * TODO: Use this value to animate pagewide vote loading, or create a new
   * value for a per-post voting basis.
   */
  voteLoading = false;

  /**
   * This points to the sorting function we are using:
   * (sortPost1, sortPost2, sortPost3)
   * The sorting bar uses this to see what sorting function we're using.
   */
  sortingFn: (a: Post, b: Post) => number;

  sortPost1 = function (a, b) {
    const time1 = new Date(a.date).getTime();
    const time2 = new Date(b.date).getTime();
    return 100000000 * (1 / (Date.now() - time2) - 1 / (Date.now() - time1)) + (b.score - a.score);
  }

  sortPost2 = function(a,b){
    const time1 = new Date(a.date).getTime();
    const time2 = new Date(b.date).getTime();
    return time2-time1;
  };

  sortPost3 = function (a, b) {
    if (b.score === a.score) {
      return b.date - a.date;
    }
    return b.score-a.score
  };

  constructor(private postService: PostService, private authService: AuthService, private cookies: CookieService) {
  }

  /**
   * Gets all the posts, loads them into the array, and gets the user's vote
   * for each post.
   */
  ngOnInit() {
    let curUser: any = this.cookies.getObject('usr');
    if (curUser.user.isNew) {
      $('#agreementModal').modal('show');
      curUser.user.isNew = false;
      this.cookies.putObject('usr', curUser);
    }

    this.reactCss = reactCss;
    this.sortingFn = this.sortPost1;
    this.postService.getPosts()
      .then(posts => {
        this.loading = false;
        this.posts = posts;
        this.posts.sort(this.sortingFn);
        this.getAllVotes();
        this.getAllReacts();
      });
  }

  /**
   * Sends a request to change the user's vote for a given post to a given vote
   * value.
   * TODO: Consider updating userVotes with the actual vote in newPost, instead
   * of what we expect it to be.
   */
  voteOnPost(post: Post, vote: number) {
    if (post._id in this.userVotes && this.userVotes[post._id] == vote) {
      vote = 0;
    }
    this.voteLoading = true;
    this.postService.voteOnPost(post._id, vote)
      .then(newPost => {
        this.voteLoading = false;
        const idx = this.posts.findIndex(p => p._id === newPost._id);
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

  getAllReacts() {
    this.userReacts = {};
    this.reactCounts = {};
    const userID = this.authService.userLoggedIn.user.userID;
    this.posts.forEach(post => {
      this.userReacts[post._id] = post.reacts.hasOwnProperty(userID) ? post.reacts[userID] : null;
      this.reactCounts[post._id] = post.reactCounts;
    });
  }

  private changeReact(emote: string, post_id: string) {
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

  objectKeys(obj: Object) {
    return Object.keys(obj);
  }
}
