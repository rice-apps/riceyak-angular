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
  @ViewChild('netID') el: ElementRef;

  loggedIn: Observable<boolean>;
  authUrl: string = `${CONFIG.cas_auth_url}?service=${CONFIG.service_url}`;
  userLoggedIn: Observable<any>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn;
    this.userLoggedIn = this.authService.userLoggedInAsync;
  }

  logout() {
    this.authService.logout()
      .then(() => {
        window.location.href = CONFIG.cas_logout_url;
      });
  }

}
