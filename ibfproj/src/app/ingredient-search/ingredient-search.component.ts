import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDetails } from '../models';

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
    private router: Router
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
    // Navigate to InventoryComponent with the selected product's ID as a route parameter
    this.router.navigate(['/inventory', product.foodId]);
  }
}