import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, URLSearchParams } from '@angular/http';
import { map } from"rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:Http) { };

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  getAllCategoies() :string[]{
    return ["电子产品", "硬件设备", "图书"]
  }

  getProducts(): Observable<Product[]>{
    return this.http.get("/api/products").pipe(map(res => res.json()))
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get("/api/product/"+id).pipe(map(res => res.json()))
  }

  getCommentsForProductId(id:number): Observable<Comment[]>{
    return this.http.get("/api/product/"+id+"/comments").pipe(map(res => res.json()))
  }

  search(params: ProductSearchParams): Observable<Product[]>{
    return this.http.get("/api/products", {search: this.encodeParams(params)}).pipe(map(res => res.json()))
  }

  private encodeParams(params: ProductSearchParams){
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
        sum.append(key, params[key])
        return sum
      }, new URLSearchParams())
  }
}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public categories: string
  ) {}
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<String>
  ) {}
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,    
    public content: string
  ) {}
}