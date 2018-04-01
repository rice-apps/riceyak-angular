import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {CONFIG} from "../../config";

@Injectable()
export class AuthService {

  private apiUrl: string = CONFIG.api_url;

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public loggedInUser: Subject<any> = new Subject<any>();

  constructor(private http: Http, private router: Router) {
    let usr = localStorage.getItem('currentUser');
    if (usr) {
      this.loggedIn.next(true);
      this.loggedInUser.next(usr)
    } else {
      this.loggedIn.next(false);
      this.loggedInUser.next({});
    }
  }

  public authenticate(ticket: String): Promise<any> {
    return this.http.get(`${this.apiUrl}/auth?ticket=${ticket}`)
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result && result.success) {
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.loggedIn.next(true);
          this.userLoggedIn.next(result);
        } else {
          console.log("Authentication failed")
        }
      })
      .catch(err => console.log(err));
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('currentUser');
      this.loggedIn.next(false);
      this.router.navigate(['/']);
      return resolve("Logged out");
    });

  }

  get isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  get userLoggedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }

  get userLoggedInAsync() {
    let usr = localStorage.getItem('currentUser');
    if (usr) {
      this.loggedInUser.next(usr);
    } else {
      this.loggedInUser.next({});
    }
    return this.loggedInUser.asObservable();
  }
}
