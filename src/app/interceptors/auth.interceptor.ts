import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StorageService } from '../services/storage/storage.service';
import { EncryptionService } from '../services/encryption/encryption.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    private userHeaders;

    constructor(public storage: StorageService,
                public encryption: EncryptionService) {
        //
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.storage.getUserFromStorage()
            .pipe(
                switchMap(user => {
                    if (user) {
                        const decryptedUser = EncryptionService.decryptUserData(user);
                        const headers: HttpHeaders = new HttpHeaders({
                            'email': decryptedUser.email,
                            'password': decryptedUser.password,
                            'accept': 'application/json'
                        });
                        return next.handle(request.clone({ headers }));
                    } else {
                        return next.handle(request.clone());
                    }
                })
            );
    }

}
