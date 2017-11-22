import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnInit {

  greetings: string[] = [
    'WRWS', 
    'Welcome!', 
    'Be nice! Or else', 
    'Jones Wins Again', 
    'Hello!', 
    'EOLRRF', 
    'JIBA', 
    'Brown Has Poorly Maintained Facilities', 
    'Stumpy will find you', 
    'Keep an eye out for the ancient scrolls',
    'MCMURTRY IS BANANAS',
    'I saw your mom smoking cra- I saw your mom loving and supporting you.',
    ''
  ]

  constructor(private authService: AuthService, 
    private route: ActivatedRoute, 
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.authService.authenticate(params['ticket'])
        .catch(err => console.log(err))
        .then(() => {
          this.router.navigate(['/posts']);
          this.alertService.pushAlert('alert-primary', this.greetings[ Math.floor(Math.random() * this.greetings.length) ]);        
        })
    })
  }

}
