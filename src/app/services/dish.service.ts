import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http'; // both of this are needed for processing the data obrained from the server side

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay';

import { RestangularModule, Restangular } from 'ngx-restangular';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private restangular: Restangular, private processHTTPMsgService: ProcessHTTPMsgService ) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList(); //array of items thats why we use getList
  }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one('dishes', id).get(); //one item thats why we use get
    }


  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
    .map(dishes => dishes[0]);    //thi return an array and we need to take only the first this (even if there is and there is only one dish)
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
      .catch(error => {return this.processHTTPMsgService.handleError(error)});
  }
}
