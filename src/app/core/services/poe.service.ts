import { Injectable, ɵɵstylePropInterpolate2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take, map, throwIfEmpty } from 'rxjs/operators';
import { ICrud } from '../interfaces/i-crud';
import { POE } from '../models/poe';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class POEService implements ICrud<POE>{


  private poes: POE[] = [];
  constructor(
    private httpClient: HttpClient
    ) { }

  add(poe: POE): void {
   if(this.findOne(poe.id!) === null) {
    this.poes.push(poe);
   }
  }
  update(poe: POE): void {

  }
  delete(poe: POE): Observable<HttpResponse<any>> {
    return of();
  }
  findAll(): Observable<POE[]> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}poe`
    )
    .pipe(
      take(1),
      map((rawPoes: any) => {
        return rawPoes.map((rawPoe: any) => {
          const poe: POE = new POE().deserialize(rawPoe);
          return poe;
        })
      })
    );
  }

  findOne(id: number): Observable<any> {
    return of(null)
  }

  public getNextId(): number {
    const poeTableSorted : POE[] = this.poes.sort((poe1:POE, poe2:POE) => {
      return (poe1.id! - poe2.id!)*-1 ;
    })
    return poeTableSorted[0].id! +1;

  }

  public getNumber(): number {
    return this.poes.length;
  }

}
