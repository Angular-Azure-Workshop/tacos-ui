import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken;
  isLoggedIn = false;
  AUTH_TOKEN_STORAGE_NAME = 'authToken';

  returnUrl = encodeURIComponent(environment.loginReturlUrl);
  logoutUrl = environment.logoutUrl + this.returnUrl;
  logoutReturnPath = environment.logoutReturnPath;
  baseLoginUrl = environment.baseLoginUrl;
  loginQuery = environment.loginQuery;
  msftLoginUrl = `${this.baseLoginUrl}microsoftaccount?${this.loginQuery}${this.returnUrl}`;
  twitterLoginUrl = `${this.baseLoginUrl}twitter?${this.loginQuery}${this.returnUrl}`;
  userLoginDetailsUrl = environment.userLoginDetailsUrl;

  public userId;
  public greeting;

  constructor(private http: HttpClient, private router: Router) {}

  public checkUserState() {
    this.authToken = window.sessionStorage.getItem(this.AUTH_TOKEN_STORAGE_NAME);
    // adapted from Anthony Chu:
    // https://github.com/Azure-Samples/functions-first-serverless-web-application/blob/master/www/static/auth.js
    if (!this.authToken && window.location.hash) {
      const match = window.location.hash.match(/token=([^&]+)/);
      if (match && match[1]) {
        this.authToken = JSON.parse(decodeURIComponent(match[1])).authenticationToken;
        window.sessionStorage.setItem(this.AUTH_TOKEN_STORAGE_NAME, this.authToken);
        this.router.navigate([]);
      }
    }

    if (!this.authToken) {
      this.authToken = window.sessionStorage.getItem(this.AUTH_TOKEN_STORAGE_NAME);
      if (!this.authToken) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    } else {
      this.isLoggedIn = true;
    }
  }

  public getUserDetails() {
    return this.http.get(this.userLoginDetailsUrl).subscribe(body => {
      this.isLoggedIn = true;
      this.userId = body[0].user_id;
      const provider = body[0].provider_name;
      this.greeting = `Signed in as ${this.userId} from ${provider}`;
    });
  }

  public getToken() {
    return this.authToken || 'nothing';
  }

  public login() {
    window.location.href = this.msftLoginUrl;
  }

  public logout() {
    window.sessionStorage.removeItem(this.AUTH_TOKEN_STORAGE_NAME);
    this.http.get(this.logoutUrl);
    window.location.href = this.logoutReturnPath;
  }
}
