import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { 
    path: 'blog',  
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
  },
  {
    path : 'manage',
    loadChildren : () => import('./manage/manage.module').then(m => m.ManageModule)
  },
  { 
    path: 'account', 
    loadChildren : () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'cart',
    loadChildren : () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'product',
    loadChildren : () => import('./product/product.module').then(m => m.ProductModule)
  },
  { 
    path: 'login', 
    component : LoginComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
