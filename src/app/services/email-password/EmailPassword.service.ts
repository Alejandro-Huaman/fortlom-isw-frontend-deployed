import { ChangePasswordDTO } from './../../models/ChangePasswordDTO';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmailValues } from 'src/app/models/email-values';
@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  basePath='https://experiment-isw-backend-jenkins.herokuapp.com/email-password'
constructor(private httpClient: HttpClient) { }

public sendEmail(dto: EmailValues): Observable<any> {
  return this.httpClient.post<any>(this.basePath + '/send-email', dto);
}

public changePassword(dto: ChangePasswordDTO): Observable<any> {
  return this.httpClient.post<any>(this.basePath + '/change-password', dto);
}

}
