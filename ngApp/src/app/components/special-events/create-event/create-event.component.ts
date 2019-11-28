import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IEvent } from 'src/app/models/event';
import { DateFormaterService } from 'src/app/services/date-formater.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  private eventForm: FormGroup;
  private eventId;
  private editState: boolean;

  constructor(
    private fb: FormBuilder,
    private _eventService: EventService,
    private _router: ActivatedRoute,
    private _dateFormater: DateFormaterService
  ) { }

  ngOnInit() {
    this.setEventId();
    this.createEventForm();
    this.setForm();
  }

  setForm() {
    if (!!this.eventId) {
      this.renderEditForm();
    }
  }

  // subscribing method will asynchronously get the id
  // instead of using parseInt(this.route.snapshot.paramMap.get('id'));
  setEventId() {
    this._router.paramMap
      .subscribe((params: ParamMap) => {
        this.eventId = params.get('id');
        this.eventId
          ? this.editState = true
          : this.editState = false;
      });
  }

  // convert to promise to get the data asynchronously and call other functions
  getEventData() {
    return this._eventService.getEvent(this.eventId).toPromise();
  }

  createEventForm() {
    this.eventForm = this.fb.group(
      (
        {
          title: [''],
          description: [''],
          date: ['']
        }
      )
    );
  }

  renderEditForm() {
    this.getEventData().then(eventData => {
      // transforming date to dd-MM-yyyy format via _dateFormater service
      const myDate = this._dateFormater.transform(new Date(eventData.date));
      // new obj with the new format
      const newEvent = Object.assign({}, eventData, { date: myDate });
      // call fillForm f-on and pass the updated event obj
      this.fillform(newEvent);
    });
  }

  fillform(data: IEvent) {
    this.eventForm.patchValue({
      title: data.title,
      description: data.description,
      date: data.date
    });
  }

  saveEvent() {
    this._eventService
      .createEvent(this.eventForm.value)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  updateEvent() {
    const newEvent = this.eventForm.value;
    newEvent._id = this.eventId;
    this._eventService
      .updateEvent(newEvent)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }


}
