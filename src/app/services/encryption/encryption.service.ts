import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  static encryptUserData(email: string, pwd: string) {
    return CryptoJS.AES.encrypt(JSON.stringify({
      'email': email,
      'password': pwd
    }), 'al_user').toString();
  }

  static decryptUserData(data: any) {
    return JSON.parse(CryptoJS.AES.decrypt(data.toString(), 'al_user').toString(CryptoJS.enc.Utf8));
  }

}
