import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ErrorType } from 'src/app/models/error-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private loginError = false;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  loginUser() {
    this._auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          console.log(res);
          // setting the generated token in localStorage
          localStorage.setItem('token', res.token);
          // navigate user to special events after logging in
          this._router.navigate(['/special']);
        },
        err => this.errorHandler.setErrorMessage(err, ErrorType.loginComponent)
      );
    this.checkError();
  }

  checkError() {
    this.errorHandler.errorMessage
      .subscribe(
        err => {
          if (err.errorType === ErrorType.loginComponent) {
            this.loginError = true;
          } else {
            this.loginError = false;
          }
        }
      );
  }

}
