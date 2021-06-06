import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-account-open',
  templateUrl: './account-open.component.html',
  styleUrls: ['./account-open.component.scss']
})
export class AccountOpenComponent implements OnInit {
  
  is_ac_open : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private authService : AuthService,
    private sharedService : SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sharedService.toggle_is_loading(true);
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      
      this.authService.ac_open(token)
        .subscribe(data => {
          if(data == 'Account is open'){
            this.is_ac_open = true;
            setTimeout(() => {
              this.sharedService.toggle_is_loading(false);
              this.router.navigate(['/login']);
            }, 3000);
          }
        })
    });
  }

}
