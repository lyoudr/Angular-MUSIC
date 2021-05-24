import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    host : string = environment.apiUrl;
    isLoggedIn : boolean = false;
    redirectUrl : string = '';

    constructor(
        private http: HttpClient
    ) { }

    login(user_info : any): Observable<any> {
        return this.http.post(`${this.host}/api/auth/user/login/`, user_info, {
            responseType : 'json',
            observe : 'response'
        })
        .pipe(
            delay(1000),
            tap(val => {
                this.isLoggedIn = true;
                this.redirectUrl = '/blog';
            })
        )
    }
}
