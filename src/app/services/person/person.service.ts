import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Person } from 'src/app/models/Person';
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  basePath = 'https://experiment-isw-backend-jenkins.herokuapp.com/api/v1/users';
  basePath2 = 'http://localhost:3000/Usuario';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  
  constructor(private http: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message} `);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
  
    return throwError('Something happened with request, please try again later');
  }
  
  
  
  // Get Usuario by id
  getById(id: any): Observable<Person> {
    return this.http.get<Person>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  update(id: any, item: any): Observable<Person> {

    return this.http.put<Person>(`${this.basePath}/changeprofile/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  
  
  }
  updatepassword(id: any, item: any): Observable<Person> {

    return this.http.put<Person>(`${this.basePath}/changepassword/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  
  
  }

}
