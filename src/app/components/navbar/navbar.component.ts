import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth-service/auth.service";
import { CONFIG } from "../../config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private loggedIn: Observable<boolean>;
  private authUrl: string = `${CONFIG.cas_auth_url}?service=${CONFIG.service_url}`;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn;
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']));
  }

}
