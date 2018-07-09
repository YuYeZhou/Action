import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product, Comment } from '../shared/product.service';
import { WebSocketService } from '../shared/web-socket.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  newRating:number = 5
  newComment:string = ""
  isCommentHidden = true
  isWatched: boolean = false
  product: Product
  currentBid:number

  comments: Comment[]
  subscription: Subscription
  

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService,
    private wsService: WebSocketService
  ) { }

  ngOnInit() {
    let productId: number = this.routeInfo.snapshot.params["productId"]
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product
        this.currentBid = product.price
      }
    )
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    )
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

  watchProduct(){
    if(this.subscription){
      this.subscription.unsubscribe()
      this.isWatched = false
      this.subscription = null
    }else{
      this.isWatched = true
      this.subscription = this.wsService.createObservableSocket("ws://localhost:8085", this.product.id)
      .subscribe(
        products => {
          let product = products.find(p => p.productId === this.product.id)
          this.currentBid = product.bid
        }
      )
    }
  }
}
