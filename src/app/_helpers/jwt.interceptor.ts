import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add authorization header with jwt token if available
    let currentUser = this.auth.getUserDetails();
    let token = this.auth.getToken();
    if (currentUser && token) {
      request = request.clone({
        setHeaders: { 
          Authorization: "Bearer "+ token
        }
      });
    }

    return next.handle(request);
  }
}