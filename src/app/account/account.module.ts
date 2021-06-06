import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

import { AccountComponent } from './account.component';
import { AccountOpenComponent } from './account-open/account-open.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
  ],
  declarations: [
    AccountComponent,
    AccountOpenComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ]
})
export class AccountModule {}
