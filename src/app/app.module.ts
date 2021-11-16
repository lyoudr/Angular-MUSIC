import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { BlogModule } from './blog/blog.module';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BlogModule,
    AccountModule,
    CartModule,
    ProductModule,
    SharedModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
