import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {CONFIG} from '../../config';
import {CookieService} from "ngx-cookie";
import {User} from "../../models/user";

@Injectable()
export class AuthService {

  private apiUrl: string = CONFIG.api_url;

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public loggedInUser: Subject<any> = new Subject<any>();

  constructor(private http: Http, private router: Router, private cookies: CookieService) {
    const usr = this.cookies.getObject('usr');
    if (usr) {
      this.loggedIn.next(true);
      this.loggedInUser.next(usr);
    } else {
      this.loggedIn.next(false);
      this.loggedInUser.next({});
    }
  }

  public authenticate(ticket: String): Promise<any> {
    return this.http.get(`${this.apiUrl}/auth?ticket=${ticket}`)
      .toPromise()
      .then(res => {
        const result = res.json();
        if (result && result.success) {
          this.cookies.putObject('usr', result);
          this.loggedIn.next(true);
          this.loggedInUser.next(result);
        } else {
          console.log('Authentication failed');
        }
      })
      .catch(err => console.log(err));
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cookies.remove('usr');
      this.loggedIn.next(false);
      this.loggedInUser.next({});
      this.router.navigate(['/home']);
      return resolve('Logged out');
    });

  }

  get isLoggedIn() {
    if (this.cookies.getObject('usr')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  get userLoggedIn(): any {
    const currentUser = this.cookies.getObject('usr');
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }

  get userLoggedInAsync() {
    const usr = localStorage.getItem('currentUser');
    if (usr) {
      this.loggedInUser.next(usr);
    } else {
      this.loggedInUser.next({});
    }
    return this.loggedInUser.asObservable();
  }
}
