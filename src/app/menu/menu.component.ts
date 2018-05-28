import { Component, OnInit, Inject } from '@angular/core'; //with inject you can inject everything from app.module with is provider

import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes'; //not ideal way
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];


  constructor(private dishService: DishService, @Inject('BaseURL') private baseURL) { } //diferent approach services and providers!!!

  ngOnInit() {  //     this live cycle method will be exexuted by anguler whenever this component is created
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }


}
