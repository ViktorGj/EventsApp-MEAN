import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user: IUser) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: IUser) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }

  // Check if there's or not token in local storage (true/false):
  loggedIn() {
    // we need to return true or false if the token exists
    // !! returns true / false if there's or not content
    return !!localStorage.getItem('token');
  }

  // method for returning the token
  getToken() {
    return localStorage.getItem('token');
  }

}
