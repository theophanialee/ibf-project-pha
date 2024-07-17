import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProductDetails } from '../models';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = 'https://api.edamam.com/api';

  private backendURL = environment.backendURL;

  constructor(private httpClient: HttpClient) {}

  searchIngredient(ingredient: string): Observable<ProductDetails[]> {
    const url = `${this.baseURL}/food-database/v2/parser?app_id=${environment.edamamAppId}&app_key=${environment.edamamAppKey}&ingr=${ingredient}`;

    return this.checkBackendForProducts(ingredient).pipe(
      switchMap((products) => {
        if (products.length > 0) {
          return of(products);
        } else {
          // Otherwise, call the external API
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
      })
    );
  }

  private storeProductsInBackend(products: ProductDetails[]): Observable<any> {
    return this.httpClient.post(`${this.backendURL}/products/cache`, products);
  }

  private checkBackendForProducts(ingr: string): Observable<ProductDetails[]> {
    return this.httpClient.get<ProductDetails[]>(
      `${this.backendURL}/products/check`,
      { params: { ingr } }
    );
  }
}
