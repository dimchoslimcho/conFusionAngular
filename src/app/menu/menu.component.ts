import { Component, OnInit } from '@angular/core';

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

  selectedDish : Dish;

  constructor(private dishService: DishService) { }

  ngOnInit() {  //     this live cycle method will be exexuted by anguler whenever this component is created
    this.dishes = this.dishService.getDishes();
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
