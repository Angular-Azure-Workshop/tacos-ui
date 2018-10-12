import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  returnUrl = encodeURIComponent(environment.loginReturlUrl);
  baseLoginUrl = environment.baseLoginUrl;
  loginQuery = environment.loginQuery;
  msftLoginUrl = `${this.baseLoginUrl}microsoftaccount?${this.loginQuery}${this.returnUrl}`;
  twitterLoginUrl = `${this.baseLoginUrl}twitter?${this.loginQuery}${this.returnUrl}`;
  userLoginDetailsUrl = environment.userLoginDetailsUrl;
  logoutUrl = environment.logoutUrl + this.returnUrl;
  logoutReturnPath = environment.logoutReturnPath;

  ngOnInit() {
    window.location.href = this.twitterLoginUrl;
  }
}
