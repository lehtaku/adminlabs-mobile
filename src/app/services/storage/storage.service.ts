import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {}

  getUserFromStorage() {
    return this.storage.get('al_user');
  }

  checkUserStored(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.get('al_user')
          .then(userStored => {
            if (userStored === null || userStored === undefined) {
              reject(false);
            } else {
              resolve(true);
            }
          }).catch(() => {
        reject(false);
      });
    });
  }

  saveUserToStorage(email: string, pwd: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.set('al_user', EncryptionService.encryptUserData(email, pwd))
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
    });
  }

  removeUserFromStorage(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.remove('al_user')
          .then(() => resolve(true))
          .catch(() => reject(false));
    });
  }

}
