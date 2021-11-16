import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../environments/environment';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    host : string = environment.apiUrl;
    
    constructor(
        private http: HttpClient,
        private cookieService : CookieService
    ) {}

    /* Product View */
    // Get product types
    getProductTypes(){
        return this.http.get(`${this.host}/api/product/type`, {
            headers: {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // Get products
    getProducts(page: any, page_size: any, id : any){
        return this.http.get(`${this.host}/api/product/?page=${page ? page : ''}&page_size=${page_size ? page_size : ''}&product_id=${id ? id : ''}`, {
            headers: {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // Create product
    postProduct(data: any){
        return this.http.post(`${this.host}/api/product/`, data, {
            headers: {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // Update product
    updateProduct(data: any){
        console.log('data is =>', data);
        return this.http.patch(`${this.host}/api/product/`, data, {
            headers: {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }
}