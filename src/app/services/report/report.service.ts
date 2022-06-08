import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Report } from 'src/app/models/report';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  basePath = environment.productoURL+'/reports';
basePath2= environment.productoURL+'/usersmains'
  
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
  
  // Create Report
  create(item: any,UserMainId:number,UserReportedId:number): Observable<Report> {

    return this.http.post<Report>(`${this.basePath2}/${UserMainId}/usersreports/${UserReportedId}/reports`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Report by id
  getById(id: any): Observable<Report> {
    return this.http.get<Report>(`${this.basePath2}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All Reports
  getAll(): Observable<Report> {
    return this.http.get<Report>(this.basePath2, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Update Report
  update(id: any, item: any): Observable<Report> {
    return this.http.put<Report>(`${this.basePath2}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Report
  delete(id: any) {
    return this.http.delete(`${this.basePath2}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
