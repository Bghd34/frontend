import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICrud } from '../interfaces/i-crud';
import { Intern } from '../models/intern';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, take, throwIfEmpty } from 'rxjs/operators'
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class InternService implements ICrud<Intern> {
  public interns: Intern[] = [];
  private itemNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public get itemNumber(): BehaviorSubject<number> {
    return this.itemNumber$;
  }
  constructor(
    private httpClient: HttpClient
  ) {}

  findAll(): Observable<Intern[]> {
    let itemNumber: number = 0;
    return this.httpClient.get<any>(
      `${environment.apiRoot}intern`
    )
    .pipe(
      take(1),
      map((rawInterns: any) => {
        itemNumber = rawInterns.length;
        this.itemNumber$.next(itemNumber);
        return rawInterns.map((rawIntern: any) => {

          const intern: Intern = new Intern();
          intern.id = rawIntern.id;
          intern.name = rawIntern.name;
          intern.firstName = rawIntern.firstName;
          intern.birthDate = new Date(rawIntern.birthDate);
          intern.address = rawIntern.adress;
          intern.email = rawIntern.email;
          intern.phoneNumber = rawIntern.phoneNumber;
          return intern;
        })
      })
    );
  }

  findOne(id: number): Observable<Intern> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}intern/${id}`, // http://127.0.0.1/intern/999,
      {
        observe: 'response'
      }
    )
    .pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {

          const rawIntern: any = response.body;

          const intern: Intern = new Intern().deserialize(rawIntern);

          return intern;
        } else {
          throw new Error(`Intern with ${id} was not found!`);
        }
      }),
      throwIfEmpty(() => new Error(`Intern with ${id} was not found!`))
    )
  }

  public getItemNumber(): number {
    return this.interns.length;
  }

  public delete(intern: Intern): Observable<HttpResponse<any>> {
    this.itemNumber$.next(this.itemNumber$.getValue() - 1);
    return this.httpClient.delete(
      `${environment.apiRoot}intern`,
      {
        body: intern,
        observe: 'response'
      }
    )
  }

  public add(internData: unknown): Observable<Intern> {
    return this.httpClient.post<any>(
    `${environment.apiRoot}intern`,
    internData
    )
    .pipe(
    take(1),
    map((rawIntern: unknown) => {
    return new Intern().deserialize(rawIntern);
    })
    );
  }

  /**
   * check if an email already exists in the database sending a request to our API
   * @param email The email we want to check
   * @returns an Observable of HttpResponse (containing status and enventually a body)
   */
  public emailAlreadyExists(email: string): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}intern/byemail?email=${email}`,
      {
        observe: 'response'
      }
    );

  }


  public update(internData: unknown): Intern {
    return new Intern();
  }

  public getNextId(): number {
    return this.interns.sort((intern1: Intern, intern2: Intern) => {
      return (intern1.id! - intern2.id!) * -1
    })[0].id! + 1 ;

  }
}
