import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {CONFIG} from "../../config";
import {Post} from "../../models/post";
import {Report} from "../../models/report";

@Injectable()
export class PostService {

  private apiUrl: string = CONFIG.api_url;

  constructor(private http: Http) {}

  /**
   * Creates headers with the user's access token. We attach these headers to each request.
   * @returns {RequestOptions}
   */
  private jwt(): RequestOptions {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.user.token) {
      let headers = new Headers({'x-access-token': currentUser.user.token});
      return new RequestOptions({headers: headers});
    }
  }

    getPosts(): Promise<any> {
      return this.http.get(`${this.apiUrl}/posts`, this.jwt())
        .toPromise()
        .then(res => res.json() as Post[])
        .catch(err => console.log(err));
    }

  postPost(title: string, body: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/posts`, {title: title, body: body}, this.jwt())
      .toPromise()
      .then(res => res.json() as Post)
      .catch(err => console.log(err));
  }

  postComment(id: string, comment: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/posts/${id}/comments`, {id: id, comment: comment}, this.jwt())
      .toPromise()
      .then(res => res.json() as Post)
      .catch(err => console.log(err));
  }

  getPost(id: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`, this.jwt())
      .toPromise()
      .then(res => res.json() as Post)
      .catch(err => console.log(err));
  }

  editPost(id: string, post: Post): Promise<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, post, this.jwt())
      .toPromise()
      .then(res => res.json() as Post)
      .catch(err => console.log(err));
  }

  deletePost(id: string): Promise<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`, this.jwt())
      .toPromise()
      .then(res => res.json() as Post)
      .catch(err => console.log(err));
  }

  voteOnPost(post_id: string, vote: number): Promise<any> {
    return this.http.put(`${this.apiUrl}/posts/${post_id}/vote`, {vote: vote}, this.jwt())
      .toPromise()
      .then(res => res.json() as Post)
      .catch(err => console.log(err));
  }

    voteOnComment(comment_id: string, post_id: string, vote: number): Promise<any> {
        return this.http.put(`${this.apiUrl}/posts/${post_id}/voteComment`, { vote: vote, comment_id:comment_id }, this.jwt())
            .toPromise()
            .then(res => res.json() as Comment)
            .catch(err => console.log(err));
    }

  getReportedPosts(): Promise<any> {
    return this.http.get(`${this.apiUrl}/reports`, this.jwt())
      .toPromise()
      .then(res => res.json() as Post[])
      .catch(err => console.log(err));
  }

  postReport(post_id: string, reason: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/reports`, {post_id: post_id, reason: reason}, this.jwt())
      .toPromise()
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  postReportReview(result: boolean, report: Report): Promise<any>{
    return this.http.put(`${this.apiUrl}/reports`, {result: result, report: report}, this.jwt())
        .toPromise()
        .then(res=>res.json())
        .catch(err=>console.log(err));
  }
}