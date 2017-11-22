import { Observable } from 'rxjs/Observable';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Observable<any[]>;

  constructor(private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.alerts = this.alertService.alert;
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.alertService.clearAlerts();          
        }
      });
  }

}
