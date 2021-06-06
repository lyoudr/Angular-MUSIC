import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    host : string = environment.apiUrl;
    isLoggedIn : boolean = false;
    redirectUrl : string = '';

    constructor(
        private http: HttpClient,
        private cookieService : CookieService,
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

    sign_up(user_info: any) : Observable<any> {
        return this.http.post(`${this.host}/api/auth/user/register/`, user_info, {
            responseType : 'text',
            observe : 'response'
        })
    }

    ac_open(token : string) : Observable<any> {
        return this.http.get(`${this.host}/api/auth/user/account_open/?token=${token}`);
    }

    forget_password(email: any): Observable<any> {
        return this.http.post(`${this.host}/api/auth/password/forget_password/`, email)
    }
    
    reset_password(reset_pw_info: any, token : string): Observable<any> {
        return this.http.patch(`${this.host}/api/auth/password/reset_password/`, reset_pw_info, {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'X-CSRFToken': this.cookieService.get('csrftoken')
            }
        })
    }

    logout(): Observable<any> {
        return this.http.post(`${this.host}/api/auth/user/logout/`, {}, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }
}
