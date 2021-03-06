import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string = '';
  password : string = '';
  is_active : boolean = false;
  
  constructor(
    private authService : AuthService,
    private cookieService : CookieService,
    private sharedService : SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  submit(username : string, password : string){
    this.sharedService.toggle_is_loading(true);

    const form_data = new FormData();
    form_data.append('username', username);
    form_data.append('password', password);
    this.authService.login(form_data)
      .subscribe(data => {
        this.cookieService.set('user_id', data.body.id); // user_id
        this.cookieService.set('access_token', data.body.access) // access token
        if (data.status == 200){
          this.sharedService.toggle_is_loading(false);
          this.router.navigate(['/manage']);
        }
      });
  }
}
