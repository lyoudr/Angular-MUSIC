import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  username : string = '';
  password : string = '';
  email : string = '';
  is_active : boolean = false;
  registered : boolean = false;

  constructor(
    private authService : AuthService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void {
  }

  submit(username: string, email: string, password: string){
    this.sharedService.toggle_is_loading(true);

    const form_data = new FormData();
    form_data.append('username', username);
    form_data.append('email', email);
    form_data.append('password', password);
    this.authService.sign_up(form_data)
      .subscribe(data => {
        
        if(data.status == 200){
          this.registered = true;
          this.sharedService.toggle_is_loading(false);
        }
      });
  }
}
