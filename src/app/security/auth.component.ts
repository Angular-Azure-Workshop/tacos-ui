import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-auth',
  template: ''
})
export class AuthComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.router.url === '/login') {
      this.userService.login();
    } else if (this.router.url === '/logout') {
      this.userService.logout();
    }
  }
}
