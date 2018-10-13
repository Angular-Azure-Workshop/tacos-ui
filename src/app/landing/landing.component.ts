import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nav } from '../nav.model';
import { UserService } from '../security/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  tacos: Nav = {
    link: '/tacos',
    name: 'Tacos',
    exact: true
  };
  layers: Nav = {
    link: '/layers',
    name: 'Layers',
    exact: false
  };
  user: Nav = {
    link: '/login',
    name: 'Login',
    exact: false
  };
  constructor(private userService: UserService, private router: Router) {
    if (this.userService.isLoggedIn === true) {
      this.user = {
        link: '/logout',
        name: 'Logout',
        exact: false
      };
    }
  }

  ngOnInit() {}

  goto(link) {
    this.router.navigate([link]);
  }
}
