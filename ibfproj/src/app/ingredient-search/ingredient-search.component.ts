import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDetails } from '../models';
import { ProductState } from '../states/product/product.state';
import { Store } from '@ngrx/store';
import { setSelectedProduct } from '../states/product/product.actions';

@Component({
  selector: 'app-ingredient-search',
  templateUrl: './ingredient-search.component.html',
  styleUrls: ['./ingredient-search.component.css'],
})
export class IngredientSearchComponent implements OnInit {
  searchForm: FormGroup;
  productList: ProductDetails[] = [];
  searchPerformed = false;
  selectedProduct: any;

  constructor(
    private fb: FormBuilder,
    private productSvc: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ product: ProductState }>
  ) {
    this.searchForm = this.fb.group({
      ingredient: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.searchForm
      .get('ingredient')
      ?.setValue(this.activatedRoute.snapshot.queryParams['ingr'] || '');
    this.search();
  }

  search(): void {
    const ingredient = this.searchForm.get('ingredient')?.value;
    if (ingredient) {
      this.productSvc
        .searchIngredient(ingredient)
        .subscribe((data: ProductDetails[]) => {
          this.productList = data;
          this.searchPerformed = true;
        });

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { ingr: ingredient },
        queryParamsHandling: 'merge',
      });
    }
  }

  // Method to handle when a product is selected
  onSelectProduct(product: ProductDetails) {
    this.selectedProduct = product;
    this.store.dispatch(setSelectedProduct({ product: product }));

    console.log('route to add foodid: ', product.foodId);
    this.router.navigate(['/inventory/add', product.foodId]);
  }
}