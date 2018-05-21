import { Component, OnInit, Input } from '@angular/core'; //Input module is a way to supply information from a component to another component
import { Dish } from '../shared/dish'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @Input()
  dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
