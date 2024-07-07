import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HouseholdService } from '../services/household.service';
import { Household } from '../models';

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css'],
})
export class HouseholdComponent implements OnInit {
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
          // Navigate to another route after successful creation
          console.log('route to next component');

          // this.router.navigate(['/households']);
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
