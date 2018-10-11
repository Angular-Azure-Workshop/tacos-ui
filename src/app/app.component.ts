import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './security/user.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  deviceInfo;
  constructor(public router: Router, public userService: UserService) {
    userService.checkUserState();
  }

  ngOnInit() {}
}
