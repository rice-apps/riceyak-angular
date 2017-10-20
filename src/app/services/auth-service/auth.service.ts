import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {CONFIG} from "../../config";

@Injectable()
export class AuthService {

  private apiUrl: string = CONFIG.api_url;

  public loggedIn: Subject<boolean> = new Subject();

  constructor(private http: Http, private router: Router) {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }

  public authenticate(ticket: String): Promise<any> {
    return this.http.get(`${this.apiUrl}?ticket=${ticket}`)
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result && result.success) {
          console.log("result");
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.loggedIn.next(true);
        } else {
          console.log("Authentication failed")
        }
      })
      .catch(err => console.log(err));
  }

}
