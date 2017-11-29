import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  alertState: BehaviorSubject<any[]>;
  timer: any;

  constructor() { 
    this.alertState = new BehaviorSubject([]);
  }

  pushAlert(alertClass: string, alertText: string) {
    let alert = { alertClass: alertClass, text: alertText };
    let currentState = this.alertState.getValue();
    currentState.push(alert);
    this.alertState.next(currentState);
    this.expire(5*1000);
  }

  expire(duration: number) {
    if (this.timer) {
        clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.alertState.next([]), duration);
  }
    
  get alert() {
    return this.alertState.asObservable();
  }

  clearAlerts() {
    this.alertState.next([]);
  }

}
