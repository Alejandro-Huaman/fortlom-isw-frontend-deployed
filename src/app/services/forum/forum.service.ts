import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Forum } from 'src/app/models/forum';
import { ForumRules } from 'src/app/models/ForumRules';
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  basePath = environment.productoURL+'/forums';
  basePath2=environment.productoURL+"/user";
  basePath3=environment.productoURL
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
  
  // Create Forum
  create(item: any,id:number): Observable<Forum> {
    return this.http.post<Forum>(`${this.basePath2}/${id}/forums`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Forum by id
  getById(id: any): Observable<Forum> {
    return this.http.get<Forum>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All Forums
  getAll(): Observable<Forum> {
    return this.http.get<Forum>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Update Forum
  update(id: any, item: any): Observable<ForumRules> {
    return this.http.put<ForumRules>(`${this.basePath3}/conductrules/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Forum
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
