import { Component, OnInit, Output } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { EventEmitter } from 'events';
import { ErrorType } from 'src/app/models/error-type.enum';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  public error;
  @Output() public errorType = new EventEmitter();

  constructor(private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.showError();
  }

  showError() {
    this.errorHandler.errorMessage
      .subscribe(
        err => this.error = err.errorObj.error
        );
  }

}
