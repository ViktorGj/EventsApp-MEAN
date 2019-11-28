import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'dateFormat'
})

export class DateFormaterService extends DatePipe implements PipeTransform {

  transform(value: any, args?: any) {
    return super.transform(value, 'yyyy-MM-dd');
  }

}
