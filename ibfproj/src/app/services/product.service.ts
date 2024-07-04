import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = 'https://api.edamam.com/api';
  private app_id = 'c9c9375a';
  private app_key = '320281746675f9de7f8c50025d2fabe5';

  constructor(private httpClient: HttpClient) {}

  searchIngredient(ingredient: string): Observable<any[]> {
    const url = `${this.baseURL}/food-database/v2/parser?app_id=${this.app_id}&app_key=${this.app_key}&ingr=${ingredient}`;

    return this.httpClient.get<any>(url).pipe(
      map((response) =>
        response.hints
          .map((item: any) => ({
            foodId: item.food.foodId,
            label: item.food.label,
            image: item.food.image,
            brand: item.food.brand,
            servingSizes: item.measures
              .filter((measure: any) => measure.label === 'Serving')
              .map((measure: any) => ({
                label: measure.label,
                weight: Math.round(measure.weight),
              })),
          }))
          .filter((product: any) => {
            return product.servingSizes.length > 0 && !!product.brand;
          })
      )
    );
  }
}
