import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HouseholdGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const householdId = localStorage.getItem('selectedHouseholdId');
    if (householdId) {
      return true;
    } else {
      alert('Please select a household first!');
      this.router.navigate(['/household']);
      return false;
    }
  }
}
