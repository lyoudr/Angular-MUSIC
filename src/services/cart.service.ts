import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from './../environments/environment';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    host : string = environment.apiUrl;
    
    constructor(
        private http: HttpClient,
        private cookieService : CookieService
    ) {}

    /* Cart View */
    // Get orders in cart
    getOrderInfos(page: number, page_size: number) {
        return this.http.get(`${this.host}/api/order/?page=${page}&page_size=${page_size}`, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }
    
    // Add product to cart
    postOrderInfo(data: any){
        return this.http.post(`${this.host}/api/order/`, data, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // Delete order in cart
    deleteOrderInfo(order_info_id : number) {
        return this.http.delete(`${this.host}/api/order/${order_info_id}/`, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // Get user pay info
    getPayInfo(){
        return this.http.get(`${this.host}/api/order/pay_info/`, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // Create order
    createOrder(data: any){
        return this.http.post(`${this.host}/api/order/`, data, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }
}