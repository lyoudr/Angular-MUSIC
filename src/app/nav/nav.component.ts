import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/services/auth.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  is_drop: boolean = false;
  order_num: number = 0;

  constructor(
    private router : Router,
    private authService : AuthService,
    private cookieService : CookieService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val : any) => {
      if(val instanceof NavigationEnd){
        this.is_drop = false;
      }
    });
    this.sharedService.order_num.subscribe(order_num => this.order_num = order_num);
  }

  logout(){
    this.sharedService.toggle_is_loading(true);
    this.authService.logout()
      .subscribe(data => {
        if (data == "You've benn logout"){
          this.cookieService.deleteAll();
          setTimeout(() => {
            this.sharedService.toggle_is_loading(false);
            this.router.navigate(['/blog']);
          }, 2000);
        }
      });
  }
}
