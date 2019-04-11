import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../../interfaces/user/user';
import { PasswordReset } from '../../interfaces/user/password-reset';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    //
  }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(environment.apiBaseUrl + '/user');
  }

  resetPwd(email: string) {
    return this.http.get<PasswordReset>(environment.apiBaseUrl + '/user/reset-password', {
      params: {
        email: email
      }
    });
  }

  changeNotificationSettings(outages: any, outageReminders: any) {
    const postData: object = {
      'notifications': {
        'outages': outages,
        'outageReminders': outageReminders
      }
    };
    return this.http.post(`${environment.apiBaseUrl}/user`, postData);
  }

}
