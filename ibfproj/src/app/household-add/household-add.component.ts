import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HouseholdService } from '../services/household.service';
import { Household } from '../models';

@Component({
  selector: 'app-household-add',
  templateUrl: './household-add.component.html',
  styleUrl: './household-add.component.css',
})
export class HouseholdAddComponent {
  householdForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private householdService: HouseholdService
  ) {}

  ngOnInit(): void {
    this.householdForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.householdForm.valid) {
      console.log('submit household');
      const household: Household = this.householdForm.value;

      this.householdService.createHousehold(household).subscribe(
        (response) => {
          console.log('Household created successfully', response);
          this.router.navigate(['/household']);
        },
        (error) => {
          console.error('Error creating household', error);
        }
      );
    } else {
      // Handle form invalid case
      console.log('Form is invalid');
    }
  }
}
