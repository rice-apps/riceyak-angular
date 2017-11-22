import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import {CONFIG} from "../../config";

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  private authUrl: string = `${CONFIG.cas_auth_url}?service=${CONFIG.service_url}`;
  private loggedIn: Observable<boolean>;  

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn;
  }

}
