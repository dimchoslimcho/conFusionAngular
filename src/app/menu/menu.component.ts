import { Component, OnInit, Inject } from '@angular/core'; //with inject you can inject everything from app.module with is provider

import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes'; //not ideal way
import { DishService } from '../services/dish.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: { //to make sure that animation happens as route change occur
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishService: DishService, @Inject('BaseURL') private baseURL) { } //diferent approach services and providers!!!

  ngOnInit() {  //     this live cycle method will be exexuted by anguler whenever this component is created
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes, errmes => this.errMess = <any>errmes);
  }

}
