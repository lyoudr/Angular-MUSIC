import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token : string = '';
  valid : boolean = true;
  set_success : boolean = false;
  is_active : boolean = false;
  
  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('token is =>', this.token);
    })
  }

  submit(email: string, newpw : string, confirmpw: string){
    if (newpw != confirmpw){
      this.valid = false;
    } else {
      this.sharedService.toggle_is_loading(true);

      const form_data = new FormData();
      form_data.append('email', email);
      form_data.append('password', newpw);
      this.authService.reset_password(form_data, this.token)
        .subscribe(data => {
          if (data == 'Update your password successfully'){
            setTimeout(() => {
              this.sharedService.toggle_is_loading(false);
              this.set_success = true;
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2500);
            }, 2000);
          }
        });
    }
  }
}
