import { Component } from '@angular/core';
import { AppState, Household } from '../models';
import { Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HouseholdService } from '../services/household.service';
import { updateHousehold } from '../states/household/household.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-one-household',
  templateUrl: './one-household.component.html',
  styleUrl: './one-household.component.css',
})
export class OneHouseholdComponent {
  selectedHousehold$: Observable<Household | null>;
  editMode = false;
  household: Household | null = null;
  householdForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private householdService: HouseholdService,
    private fb: FormBuilder
  ) {
    this.selectedHousehold$ = this.store.select(
      (state) => state.household.selectedHousehold
    );
    this.householdForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectedHousehold$ = this.store
      .select((state) => state.household.selectedHousehold)
      .pipe(
        switchMap((household) => {
          if (!household) {
            const householdId = localStorage.getItem('selectedHouseholdId');
            if (householdId) {
              return this.householdService.getHouseholdDetailsByHHId(
                householdId
              );
            } else {
              return of(null);
            }
          } else {
            return of(household);
          }
        })
      );

    this.selectedHousehold$.subscribe((household) => {
      this.household = household;
      if (this.household) {
        this.householdForm.patchValue({
          name: this.household.name,
          description: this.household.description,
        });
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode && this.household) {
      this.householdForm.patchValue({
        name: this.household.name,
        description: this.household.description,
      });
    }
  }

  saveHousehold(householdId: string): void {
    if (this.householdForm.valid) {
      const updatedHousehold = {
        ...this.household,
        ...this.householdForm.value,
      };

      this.householdService
        .updateHousehold(householdId, updatedHousehold)
        .subscribe(
          (household) => {
            this.store.dispatch(updateHousehold({ household }));
            this.editMode = false;
          },
          (error) => {
            console.error('Error updating household:', error);
          }
        );
    }
  }
}