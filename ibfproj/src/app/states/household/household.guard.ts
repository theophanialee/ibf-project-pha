import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

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
      // Redirect to a suitable page or show a message
      this.router.navigate(['/household/list']);
      return false;
    }
  }
}
