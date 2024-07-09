import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HouseholdService } from '../services/household.service';
import { JwtauthService } from '../services/jwtauth.service';
import { Household } from '../models';
import { Observable } from 'rxjs';

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
    private jwtAuthSvc: JwtauthService
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

  navigateToHouseholdDetails(householdId: string): void {
    this.router.navigate(['/household', 'manage', householdId]);
  }

  selectHousehold(householdId: string): void {
    localStorage.setItem('selectedHouseholdId', householdId);
  }
}
