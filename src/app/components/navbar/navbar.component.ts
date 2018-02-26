import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth-service/auth.service";
import { CONFIG } from "../../config";
import {Router} from "@angular/router";
import {} from "bootstrap";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /**
   * Observable boolean whether user is logged in or not.
   */
  loggedIn: Observable<boolean>;

  authUrl: string = `${CONFIG.cas_auth_url}?service=${CONFIG.service_url}`;
  avatarURL: string;

  constructor(private authService: AuthService) { }

  /**
   * Initialization lifecycle hook.
   */
  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn;
    this.loggedIn.subscribe(val => {
      if (val) this.avatarURL = JSON.parse(localStorage.getItem('currentUser')).user.avatarURL;
    })
  }

  /**
   * Logs user out and redirects to CAS logout page.
   */
  logout() {
    this.authService.logout()
      .then(() => {
        window.location.href = CONFIG.cas_logout_url;
      });
  }
}
