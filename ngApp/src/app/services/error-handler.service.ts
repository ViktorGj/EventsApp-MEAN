import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorType } from '../models/error-type.enum';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private dataSource = new BehaviorSubject<any>([]);
  errorMessage = this.dataSource.asObservable();

  constructor() { }

  setErrorMessage(err: Error | HttpErrorResponse, type: ErrorType) {
    const errorObj = {
      errorObj: err,
      errorType: type
    };
    this.dataSource.next(errorObj);
  }

}
