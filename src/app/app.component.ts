import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { UserService } from './security/user.service';
import { AppInsights } from 'applicationinsights-js';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  deviceInfo;
  constructor(public router: Router, public userService: UserService) {
    this.userService.checkUserState();
    if (this.userService.isLoggedIn) {
      this.userService.getUserDetails();
    }
  }

  ngOnInit() {
    AppInsights.downloadAndSetup({
      instrumentationKey: '2c847176-e1b4-4b63-b2c5-996753f5410b'
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          AppInsights.trackPageView('home');
        } else {
          AppInsights.trackPageView(event.url.substring(1));
        }
      }
    });
  }
}
