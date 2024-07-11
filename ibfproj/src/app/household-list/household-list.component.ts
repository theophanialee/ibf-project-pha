import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HouseholdService } from '../services/household.service';
import { JwtauthService } from '../services/jwtauth.service';
import { AppState, Household } from '../models';
import { Observable } from 'rxjs';
import {
  storeHouseholdId,
  storeSelectedHousehold,
} from '../states/household/household.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-household-list',
  templateUrl: './household-list.component.html',
  styleUrl: './household-list.component.css',
})
export class HouseholdListComponent {
  households$!: Observable<Household[]>;

  constructor(
    private router: Router,
    private householdSvc: HouseholdService,
    private jwtAuthSvc: JwtauthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.fetchHouseholds();
  }

  fetchHouseholds(): void {
    const userId = this.jwtAuthSvc.getUserId();
    console.log('Fetched User ID:', userId);

    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    this.households$ = this.householdSvc.getHouseholdsByUserId(userId); // Assign observable
  }

  selectHousehold(household: Household): void {
    localStorage.setItem('selectedHouseholdId', household.householdId);
    this.store.dispatch(
      storeHouseholdId({ householdId: household.householdId })
    );
    this.store.dispatch(storeSelectedHousehold({ household }));
    this.router.navigate(['/household', household.householdId]);
  }
}


