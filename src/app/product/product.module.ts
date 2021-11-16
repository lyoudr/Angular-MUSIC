import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductAddComponent } from './product-add/product-add.component';

import { ProductRoutingModule } from './product-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductComponent, 
    ProductAddComponent, 
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ]
})
export class ProductModule { }
