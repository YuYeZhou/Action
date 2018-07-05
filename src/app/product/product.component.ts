import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../shared/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Product[];

  private keyword: string;

  private titleFilter: FormControl = new FormControl()

  private imgUrl = "http://placehold.it/320x150"

  constructor(private ProductService: ProductService) { 
  }

  ngOnInit() {
    this.products = this.ProductService.getProducts();
    this.titleFilter.valueChanges
        .pipe(debounceTime(500))
        .subscribe(
          value => this.keyword = value
        )
  }

}

