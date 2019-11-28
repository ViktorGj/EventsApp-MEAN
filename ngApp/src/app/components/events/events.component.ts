import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [];

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this._eventService.getEvents()
      .subscribe(
        data => this.events = data,
        err => console.log(err)
      );
  }
}
