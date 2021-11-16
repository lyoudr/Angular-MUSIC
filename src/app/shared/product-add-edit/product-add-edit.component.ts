import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {

  @Input() productForm = '';
  @Input() post_obj : any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
