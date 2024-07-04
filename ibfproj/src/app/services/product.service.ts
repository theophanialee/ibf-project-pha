import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductDetails } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = 'https://api.edamam.com/api';
  private app_id = 'c9c9375a';
  private app_key = '320281746675f9de7f8c50025d2fabe5';

  private backendURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  searchIngredient(ingredient: string): Observable<ProductDetails[]> {
    const url = `${this.baseURL}/food-database/v2/parser?app_id=${this.app_id}&app_key=${this.app_key}&ingr=${ingredient}`;

    return this.httpClient.get<any>(url).pipe(
      map((response) =>
        response.hints
          .map((item: any) => ({
            foodId: item.food.foodId,
            label: item.food.label,
            image: item.food.image,
            brand: item.food.brand,
            servingSizeWeight: item.measures
              .filter((measure: any) => measure.label === 'Serving')
              .map((measure: any) => Math.round(measure.weight))[0], // Get the first serving size weight
          }))
          .filter((product: any) => {
            return !!product.servingSizeWeight && !!product.brand;
          })
      ),
      tap((products: ProductDetails[]) => {
        // Send products to backend for storage
        this.storeProductsInBackend(products).subscribe();
      })
    );
  }

  private storeProductsInBackend(products: ProductDetails[]): Observable<any> {
    return this.httpClient.post(`${this.backendURL}/products/cache`, products);
  }
}