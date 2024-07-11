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
import { InventoryService } from '../services/inventory.service';

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
    private router: Router,
    private store: Store<{ product: ProductState }>,
    private inventorySvc: InventoryService
  ) {
    this.selectedProduct$ = this.store.pipe(select(getSelectedProduct));
  }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      label: ['', Validators.required],
      brand: ['', Validators.required],
      servingSizeWeight: ['', Validators.required],
      expiryDate: ['', [Validators.required, this.futureDateValidator]],
      servings: ['', [Validators.required, this.positiveNumberValidator]],
    });

    this.selectedProduct$.subscribe((product) => {
      if (product) {
        this.inventoryForm.patchValue({
          label: product.label,
          brand: product.brand,
          servingSizeWeight: product.servingSizeWeight,
        });
      }
    });
  }

  onSubmit() {
    if (this.inventoryForm.valid) {
      const formData = this.inventoryForm.value;
      this.inventorySvc.submitInventoryForm(formData).subscribe(
        (response) => {
          console.log('Form data submitted successfully:', response);
          const householdId = localStorage.getItem('selectedHouseholdId');
          this.router.navigate(['/household', householdId]);
        },
        (error) => {
          console.error('Error submitting form data:', error);
          alert('Error submitting form data!');
        }
      );
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
