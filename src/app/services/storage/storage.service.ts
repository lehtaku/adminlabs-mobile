import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { fromPromise } from 'rxjs/internal-compatibility';

import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {}

  getUserFromStorage() {
      return fromPromise(this.storage.get('al_user'));
  }

  checkUserStored(): Promise<any> {
      return new Promise((resolve, reject) => {
          this.storage.get('al_user')
              .then(user => {
                  if (user == null || Object.entries(user).length <= 0) {
                      reject();
                  } else {
                      resolve();
                  }
              })
              .catch(() => reject());
      });
  }

  saveUserToStorage(email: string, pwd: string) {
      return fromPromise(this.storage.set('al_user', EncryptionService.encryptUserData(email, pwd)));
  }

  removeUserFromStorage() {
      return fromPromise(this.storage.remove('al_user'));

  }

}
