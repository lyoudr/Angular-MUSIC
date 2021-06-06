import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountOpenComponent } from './account-open/account-open.component';

import { AccountComponent } from './account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes : Routes = [
    { path: '', component: AccountComponent },
    { path: 'ac_open', component : AccountOpenComponent },
    { path: 'forget_password', component : ForgetPasswordComponent },
    { path: 'reset_password', component : ResetPasswordComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {}