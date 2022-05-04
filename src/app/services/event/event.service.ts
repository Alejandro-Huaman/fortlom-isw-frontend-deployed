import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Event } from 'src/app/models/event';
@Injectable({
  providedIn: 'root'
})
export class EventService {




basePath = 'https://fortlom-isw-backend.herokuapp.com/api/v1/event';
BasePath=  'https://fortlom-isw-backend.herokuapp.com/api/v1/events';
basepathcreate='https://fortlom-isw-backend.herokuapp.com/api/v1/artist';
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


// Create Event
create(artistid:number,item: any): Observable<Event> {
  return this.http.post<Event>(`${this.basepathcreate}/${artistid}/events`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get Event by id
getById(id: any): Observable<Event> {
  return this.http.get<Event>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get All Events
getAll(): Observable<Event> {
  return this.http.get<Event>(this.BasePath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Update Event
update(id: any, item: any): Observable<Event> {
  return this.http.put<Event>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Delete Event
delete(id: any) {
  return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}




















}
