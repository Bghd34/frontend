import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  transform(value: Date, ...args: unknown[]): Observable<string> {
    return this._ageComputing(value);
  }

  private _ageComputing(value: Date): Observable<string> {
    /*
    const today: moment.Moment = moment(); // Date du jour (à ne jamais faire)
    const birthDate: moment.Moment = moment(value); // convertir 'value' de type Date en un objet de type Moment
    return today.diff(birthDate, 'year').toString() + ' year(s) old';
    */
    return this.httpClient.get<any>(
      `${environment.worldClockApi}`
    ).pipe(
      take(1),
      map((utcDate: any) => {
        const today: moment.Moment = moment(utcDate.currentDateTime); // convertir 'utcDate.currentDateTime' de type Date en un objet de type Moment
        const birthDate: moment.Moment = moment(value); // convertir 'value' de type Date en un objet de type Moment
        return today.diff(birthDate, 'year').toString()+ ' year(s) old'; // diff() permet de calculer la différence entre 'today' et 'birthDate'
      })
      );

  }

}
