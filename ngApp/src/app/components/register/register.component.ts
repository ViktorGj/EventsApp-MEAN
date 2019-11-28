import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUser } from 'src/app/models/user';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ErrorType } from '../../models/error-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private registerError = false;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        email: [''],
        password: ['']
      }
    );
  }

  registerUser() {
    this._auth.registerUser(this.registerForm.value)
      .subscribe(
        res => {
          // print res (token)
          console.log(res);
          // setting the generated token in localStorage
          localStorage.setItem('token', res.token);
          // after registering navigate user to special events
          this._router.navigate(['/special']);
        },
        err => this.errorHandler.setErrorMessage(err, ErrorType.registerComponent)
      );
    this.checkError();
  }

  checkError() {
    this.errorHandler.errorMessage
      .subscribe(
        err => {
          if (err.errorType === ErrorType.registerComponent) {
            this.registerError = true;
          } else {
            this.registerError = false;
          }
        }
      );
  }

}
