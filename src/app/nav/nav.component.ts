import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  is_drop: boolean = false;
  
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val : any) => {
      if(val instanceof NavigationEnd){
        this.is_drop = false;
      }
    });
  }

}
