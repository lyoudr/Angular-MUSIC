import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  is_loading : boolean = false;
  is_loadingChange: Subject<boolean> = new Subject<boolean>();
  
  constructor() { 
    this.is_loadingChange.subscribe((value) => {
      this.is_loading = value
    });
  }
  
  toggle_is_loading(value : boolean) {
    this.is_loadingChange.next(value);
  }
}
