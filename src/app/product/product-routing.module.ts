import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

import { AuthGuard } from '../../auth/auth';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


const routes: Routes = [
    { path : '', component: ProductComponent, canActivate: [AuthGuard]},
    { path : 'add', component: ProductAddComponent, canActivate: [AuthGuard]},
    { path : 'edit/:id', component: ProductEditComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
