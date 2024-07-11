import { Component } from '@angular/core';
import { AppState, Household } from '../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HouseholdService } from '../services/household.service';
import { updateHousehold } from '../states/household/household.actions';

@Component({
  selector: 'app-one-household',
  templateUrl: './one-household.component.html',
  styleUrl: './one-household.component.css',
})
export class OneHouseholdComponent {
  selectedHousehold$: Observable<Household | null>;
  editMode = false;
  household: Household | null = null;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private householdService: HouseholdService
  ) {
    this.selectedHousehold$ = this.store.select(
      (state) => state.household.selectedHousehold
    );
  }

  ngOnInit(): void {
    this.selectedHousehold$.subscribe((household) => {
      this.household = household;
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveHousehold(householdId: string): void {
    if (this.household) {
      this.householdService
        .updateHousehold(householdId, this.household)
        .subscribe(
          (updatedHousehold) => {
            this.store.dispatch(
              updateHousehold({ household: updatedHousehold })
            );
            this.editMode = false;
          },
          (error) => {
            console.error('Error updating household:', error);
          }
        );
    }
  }
}
