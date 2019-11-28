import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IEvent } from '../../models/event';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents: [IEvent];

  constructor(
    private _eventService: EventService,
    private _router: Router) { }

  ngOnInit() {
    this.getSpecialEvents();
  }

  getSpecialEvents() {
    this._eventService.getSpecialEvents()
      .subscribe(
        data => this.specialEvents = data,
        // data => console.log(data),
        // handling the err
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }

  deleteEvent(id) {
    console.log(id);
    this._eventService
      .deleteEvent(id)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log('Error ' + JSON.stringify(err))
      );
  }

}
