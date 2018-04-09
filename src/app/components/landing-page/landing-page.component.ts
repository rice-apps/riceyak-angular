import { Component, OnInit } from '@angular/core';
import {CONFIG} from '../../config';
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  authUrl = `${CONFIG.cas_auth_url}?service=${CONFIG.service_url}`;

  loggedIn: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn;
  }

}
