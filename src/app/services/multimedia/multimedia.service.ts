import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Multimedia } from 'src/app/models/multimedia';
@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  basePath = 'https://fortlom-isw-backend.herokuapp.com/api/v1/multimedias';
  basePath2='https://fortlom-isw-backend.herokuapp.com/api/v1/publications'
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
  
  // Create Multimedia
  create(item: any,publicationId:number){
     this.http.post(`${this.basePath2}/${publicationId}/multimedias`, item,  { observe: 'response' })
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Multimedia by id
  getById(id: any): Observable<Multimedia> {
    return this.http.get<Multimedia>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All Multimedias
  getAll(): Observable<Multimedia> {
    return this.http.get<Multimedia>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getallmultimediabypublication(id:number){
  
    return this.http.get<Multimedia>(`${this.basePath2}/${id}/multimedias`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  }
  // Update Multimedia
  update(id: any, item: any): Observable<Multimedia> {
    return this.http.put<Multimedia>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Multimedia
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
