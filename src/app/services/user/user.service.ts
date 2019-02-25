import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';

import { User } from '../../interfaces/user/user';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private storageService: StorageService) {
  }

  static getPlainHeaders() {
    return new HttpHeaders({
      'accept': 'application/json'
    });
  }

  async getUserHeaders () {
    const userData = await this.storageService.getUserFromStorage();
    let userHeaders = new HttpHeaders(EncryptionService.decryptUserData(userData));
    userHeaders = userHeaders.append('accept', 'application/json');
    return userHeaders;
  }

  getNonLoggedUser(email: string, pwd: string): Promise<HttpResponse<any>> {
    return this.http.get<User>( environment.apiBaseUrl + '/user', {
      headers: new HttpHeaders({
        email: email,
        password: pwd
      }),
      observe: 'response'
    }).toPromise();
  }

  async getLoggedUser() {
    const headers = await this.getUserHeaders();
    return this.http.get<User>(environment.apiBaseUrl + '/user', {
      headers: headers,
    }).toPromise();
  }

  async resetPwd(email: string) {
    return this.http.get<boolean>(environment.apiBaseUrl + '/user/reset-password', {
      headers: UserService.getPlainHeaders(),
      params: {
        email: email
      }
    }).toPromise();
  }

  async changeNotificationSettings(outages: any, outageReminders: any) {
    const headers = await this.getUserHeaders();
    const postData: object = {
      'notifications': {
        'outages': outages,
        'outageReminders': outageReminders
      }
    };
    return this.http.post(`${environment.apiBaseUrl}/user`, postData, {
      headers: headers,
    }).toPromise();
  }

}
