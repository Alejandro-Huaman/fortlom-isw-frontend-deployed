import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { LoginUser } from 'src/app/models/LoginUser';
import { JwtDTO } from 'src/app/models/JwtDTO';
import { environment } from './../../../environments/environment';
import { NewArtist } from 'src/app/models/NewArtist';
import { NewFanatic } from 'src/app/models/NewFanatic';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http:HttpClient) { }
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


  LogUser(item: LoginUser): Observable<JwtDTO>{

    return this.http.post<any>(`https://experiment-isw-backend-jenkins.herokuapp.com/auth/login`, item, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  
  }
  RegisterArtist(item:NewArtist): Observable<any>{

     return this.http.post<any>(`https://experiment-isw-backend-jenkins.herokuapp.com/auth/artist`, item, this.httpOptions)

  }
  RegisterFanatic(item:NewFanatic): Observable<any>{

    return this.http.post<any>(`https://experiment-isw-backend-jenkins.herokuapp.com/auth/fanatic`, item, this.httpOptions)

 }







}
