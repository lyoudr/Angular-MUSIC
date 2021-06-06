import { Injectable } from "@angular/core";
import { AuthService } from "src/services/auth.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(
        private cookieService : CookieService,
        private authService: AuthService,
        private router : Router
    ) {}

    canActivate(
        next : ActivatedRouteSnapshot,
        state : RouterStateSnapshot) : true|UrlTree {
            const url : string = state.url;
            return this.check_login(url);
    }
    

    check_login(url: string): true|UrlTree {
        console.log("this.cookieService.get('user_id') is =>", this.cookieService.get('user_id'));
        if (this.cookieService.get('user_id')){
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Redirect to the login page
        return this.router.parseUrl('/login');
    }
}