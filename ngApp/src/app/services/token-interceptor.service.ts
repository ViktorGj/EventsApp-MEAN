import { Injectable, Injector } from '@angular/core';
// httpInterceptor - interface
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
// Http interceptor sends token back to backend for validation
// in order to implement HttpInterceptor we have to define intercept method ()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  // "next" - calls the next function and passes the request
  intercept(req, next) {
    // usign injector we inject the AuthService (possible errors if we inject AuthService direct into constructor)
    const authService = this.injector.get(AuthService);
    // clone of the request:
    const tokenizedReq = req.clone({
      // in the headers we add the Authorization with the token
      setHeaders: {
        // key Authorization, value: Bearer (format) + token (obtained from the service)
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }

}
