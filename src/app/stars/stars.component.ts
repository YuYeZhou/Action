import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input()
  private rating: Number
  private stars: Boolean[]

  constructor() { }

  ngOnInit() {
    this.stars = []
    for (let i = 1; i < 6; i++){
      this.stars.push(i > this.rating)
    }
  }

}
