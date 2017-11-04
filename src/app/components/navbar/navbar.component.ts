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
  
  private loggedIn: Observable<boolean>;
  private authUrl: string = `${CONFIG.cas_auth_url}?service=${CONFIG.service_url}`;
  private username: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn;
    if (this.authService.userLoggedIn) {
      this.username = this.authService.userLoggedIn.user.username;
    }
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/']);
        this.username = '';
      });
  }

}
