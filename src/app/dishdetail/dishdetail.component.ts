import { Component, OnInit, Inject } from '@angular/core'; //Input module is a way to supply information from a component to another component

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchmap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  addcommentForm: FormGroup;
  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author is required',
      'minlength': 'Author Name must be a least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  errMess: string;

  constructor( private dishservice: DishService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder, @Inject('BaseURL') private baseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);}, errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.addcommentForm = this.fb.group({

      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5
    });

    this.addcommentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if(!this.addcommentForm) {return;}
    const form = this.addcommentForm;

    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key] + ' '
        }
      }
    }
  }


  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    let d = new Date();
    let n = d.toISOString();
    this.dish.comments.push(this.addcommentForm.value);
    this.dish.comments[this.dish.comments.length-1].date = n;
    this.addcommentForm.reset({
      comment: '',
      author: '',
      rating: 5,
    });
  }

}
