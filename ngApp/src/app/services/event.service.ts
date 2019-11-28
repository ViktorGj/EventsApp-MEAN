import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = 'http://localhost:3000/api/events';
  private _specialEventsUrl = 'http://localhost:3000/api/special';
  private _createEventUrl = 'http://localhost:3000/api/special/create';
  private _deleteUrl = 'http://localhost:3000/api/special/delete/';
  private _singleEventUrl = 'http://localhost:3000/api/special/';
  private _updateEventUrl = 'http://localhost:3000/api/special/update';


  constructor(private http: HttpClient) { }

  // Get ONE event
  getEvent(id): Observable<IEvent> {
    return this.http.get<IEvent>(this._singleEventUrl + id);
  }

  // Get ALL events
  getEvents(): Observable<any> {
    return this.http.get<any>(this._eventsUrl);
  }

  // get ALL SPECIAL events
  getSpecialEvents(): Observable<[IEvent]> {
    return this.http.get<any>(this._specialEventsUrl);
  }

  createEvent(event: IEvent) {
    return this.http.post<IEvent>(this._createEventUrl, event);
  }

  deleteEvent(id) {
    return this.http.delete(this._deleteUrl + id);
  }

  updateEvent(event: IEvent) {
    return this.http.put<IEvent>(this._updateEventUrl, event);
  }

}
