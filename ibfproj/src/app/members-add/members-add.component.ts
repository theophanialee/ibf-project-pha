import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HouseholdService } from '../services/household.service';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
  selector: 'app-members-add',
  templateUrl: './members-add.component.html',
  styleUrl: './members-add.component.css',
})
export class MembersAddComponent {
  searchForm: FormGroup;
  userList: any[] = [];
  searchPerformed: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private householdSvc: HouseholdService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      username: [''],
    });
  }

  search(): void {
    const usernameSearch = this.searchForm.get('username')?.value;
    if (usernameSearch) {
      this.householdSvc
        .searchUsers(usernameSearch)
        .pipe(takeUntil(this.destroy$))
        .subscribe((users) => {
          this.userList = users || [];
          this.searchPerformed = true;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectUser(user: User): void {
    console.log('Selected user:', user);

    const householdId = localStorage.getItem('selectedHouseholdId');

    if (householdId != null) {
      this.householdSvc
        .addMemberToHousehold(householdId, user)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (response) => {
            if (response) {
              this.loading = false;
              alert('User added to household');
              this.router.navigate([`/household/${householdId}`]);
            } else {
              alert('User is already an existing member in this household');
              this.router.navigate([`/household/${householdId}`]);
            }
          },
          (error) => {
            this.loading = false;
            console.error('Error adding user to household:', error);
            alert('Failed to add user to household');
          }
        );
    }
  }
}