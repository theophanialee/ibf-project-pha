import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductState } from '../states/product/product.state';
import { getSelectedProduct } from '../states/product/product.selectors';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
})
export class InventoryFormComponent implements OnInit {
  inventoryForm!: FormGroup;
  selectedProduct$: Observable<ProductDetails | null>;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ product: ProductState }>
  ) {
    this.selectedProduct$ = this.store.pipe(select(getSelectedProduct));
  }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      label: ['', Validators.required],
      brand: ['', Validators.required],
      servingSizeWeight: ['', Validators.required],
      expiryDate: ['', [Validators.required, this.futureDateValidator]], // Corrected placement
      servings: ['', [Validators.required, this.positiveNumberValidator]], // Corrected placement
    });

    this.selectedProduct$.subscribe((product) => {
      if (product) {
        this.inventoryForm.patchValue({
          label: product.label,
          brand: product.brand,
          servingSizeWeight: product.servingSizeWeight,
          // Optionally, set other form fields here
        });
      }
    });
  }

  onSubmit() {
    if (this.inventoryForm.valid) {
      // Process form submission
      console.log(this.inventoryForm.value);
      // Example: Send data to backend or perform further actions
    } else {
      // Form is invalid, handle accordingly
    }
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const controlDate = new Date(control.value);
    return controlDate > currentDate ? null : { futureDate: true };
  }

  positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    return control.value > 0 ? null : { positiveNumber: true };
  }
}
