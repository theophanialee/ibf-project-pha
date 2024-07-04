import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDetailsList } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredient-search',
  templateUrl: './ingredient-search.component.html',
  styleUrls: ['./ingredient-search.component.css'],
})
export class IngredientSearchComponent implements OnInit {
  searchForm: FormGroup;
  productList: ProductDetailsList[] = [];
  searchPerformed: boolean = false;

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
        .subscribe((data: ProductDetailsList[]) => {
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
}
