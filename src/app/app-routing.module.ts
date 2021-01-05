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
  { path: 'login', component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
