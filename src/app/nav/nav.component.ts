import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
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
  pages: Array<{url: string; name: string}> = [
    {
      'url': '/manage',
      'name': 'Personal page'
    },
    {
      'url': '/product',
      'name': 'Personal products'
    }
  ];
  
  constructor(
    private _eleref : ElementRef,
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
          this.sharedService.order_num.next(0);
          setTimeout(() => {
            this.sharedService.toggle_is_loading(false);
            this.router.navigate(['/blog']);
          }, 2000);
        }
      });
  }

  @HostListener('document:click', ['$event'])
  close_drop(event: any){
    const drop_btn = this._eleref.nativeElement.querySelector('#nav_drop').contains(event.target);
    const drop_down = this._eleref.nativeElement.querySelector('#drop') ? this._eleref.nativeElement.querySelector('#drop').contains(event.target) : this._eleref.nativeElement.querySelector('#drop');
    if (!drop_btn && !drop_down && this.is_drop){
      this.is_drop = false;
    } 
  }
}
