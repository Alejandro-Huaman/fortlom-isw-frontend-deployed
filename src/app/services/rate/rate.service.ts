import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Rate } from 'src/app/models/rate';
@Injectable({
  providedIn: 'root'
})
export class RateService {

  basePath = 'https://fortlom-isw-backend.herokuapp.com/api/v1/rates';
  basePatn2='https://fortlom-isw-backend.herokuapp.com/api/v1/fanatics';
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
  
  // Create Rate
  create(fanaticid:number,artistid:number,item: any): Observable<Rate> {
    return this.http.post<Rate>(`${this.basePatn2}/${fanaticid}/artists/${artistid}/rates`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Rate by id
  getById(id: any): Observable<Rate> {
    return this.http.get<Rate>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All Rates
  getAll(): Observable<Rate> {
    return this.http.get<Rate>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Update Rate
  update(id: any, item: any): Observable<Rate> {
    return this.http.put<Rate>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Rate
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
