import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  is_active : boolean = false;
  is_pop : boolean = false;

  constructor(
    private authService : AuthService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void {
  }

  submit(email: string){
    this.sharedService.toggle_is_loading(true);
    const form_data = new FormData();
    form_data.append('email', email)
    this.authService.forget_password(form_data)
      .subscribe(data => {
        if (data == 'Email has been sent to your email'){
          setTimeout(() => {
            this.sharedService.toggle_is_loading(false);
            this.is_pop = true;
          }, 2000);
        }
      });
      
  }
}
