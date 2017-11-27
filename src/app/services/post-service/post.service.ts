import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {CONFIG} from "../../config";
import {Post} from "../../models/post";
import {Comment} from "../../models/comment";

@Injectable()
export class PostService {

  private apiUrl: string = CONFIG.api_url;

  constructor(private http: Http) { }

  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.user.token) {
      let headers = new Headers({ 'x-access-token': currentUser.user.token });
      return new RequestOptions({ headers: headers });
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
  edit(id: string, post: any): Promise<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, {id: id, body: post}, this.jwt())
        .toPromise()
        .then(res => res.json() as Post)
        .catch(err => console.log(err));
  }

  delete(id: string): Promise<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`, this.jwt())
        .toPromise()
        .then(res => res.json() as Post)
        .catch(err => console.log(err));
   }
  voteOnPost(post_id: string, vote: number): Promise<any> {
    return this.http.put(`${this.apiUrl}/posts/${post_id}/vote`, { vote: vote }, this.jwt())
      .toPromise()
      .then(res => res.json() as Post)
      .catch(err => console.log(err));
  }
}