import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLoginDetailsUrl = 'https://tacofancy-api.azurewebsites.net/.auth/me';
  authToken;
  isLoggedIn = false;
  AUTH_TOKEN_STORAGE_NAME = 'authToken';
  public userId;
  public greeting;

  constructor(private http: HttpClient) {}

  public checkUserState() {
    this.authToken = window.sessionStorage.getItem(this.AUTH_TOKEN_STORAGE_NAME);
    // adapted from Anthony Chu:
    // https://github.com/Azure-Samples/functions-first-serverless-web-application/blob/master/www/static/auth.js
    if (!this.authToken && window.location.hash) {
      const match = window.location.hash.match(/token=([^&]+)/);
      if (match && match[1]) {
        this.authToken = JSON.parse(decodeURIComponent(match[1])).authenticationToken;
        window.sessionStorage.setItem(this.AUTH_TOKEN_STORAGE_NAME, this.authToken);
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
      this.getUserDetails();
    }
  }

  public getUserDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-ZUMO-AUTH': this.authToken || 'nothing',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.userLoginDetailsUrl, httpOptions).subscribe(body => {
      this.isLoggedIn = true;
      this.userId = body[0].user_id;
      const provider = body[0].provider_name;
      this.greeting = `Signed in as ${this.userId} from ${provider}`;
    });
  }
}
