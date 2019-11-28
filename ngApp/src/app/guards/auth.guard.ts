import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router) { }

// Implementing custom guard instead of modifying the default
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      // if theres no token navigate user to login
      this._router.navigate(['/login']);
      return false;
    }
  }

}
