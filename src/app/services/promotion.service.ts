import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: number): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0]; //one element of that array
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promo) => (promo.featured))[0];
  }

  constructor() { }
}
