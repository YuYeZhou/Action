import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product, Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private newRating:number = 5
  private newComment:string = ""
  private isCommentHidden = true

  product: Product;

  comments: Comment[]

  constructor(
    private routeInfo: ActivatedRoute,
    private ProductService: ProductService
  ) { }

  ngOnInit() {
    let productId: number = this.routeInfo.snapshot.params["productId"]
    this.product = this.ProductService.getProduct(productId)
    this.comments = this.ProductService.getCommentsForProductId(productId)
    
  }

  addComment() {
    if (this.newComment == ""){
      return
    }else{
      let comment = new Comment(0, this.product.id, new Date().toISOString(), "Someone", this.newRating, this.newComment)
      this.comments.unshift(comment)
      let sum = this.comments.reduce((sum, comment) => sum += comment.rating, 0)
      this.product.rating = sum / this.comments.length
      this.newRating = 5
      this.newComment = null
      this.isCommentHidden = false
    }
  }
}
