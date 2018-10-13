import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(public userService: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ setHeaders: { 'X-ZUMO-AUTH': `${this.userService.getToken()}` } });
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`Request for ${request.urlWithParams}`);
        }
      })
    );
  }
}
