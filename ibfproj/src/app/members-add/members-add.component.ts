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

  constructor(private fb: FormBuilder, private householdSvc: HouseholdService) {
    this.searchForm = this.fb.group({
      user: [''],
    });

    // Watch changes in the form input field
    this.searchForm
      .get('user')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          return this.householdSvc.searchUsers(searchTerm);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((users) => {
        // this.userList = users;
        this.searchPerformed = true;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectUser(user: any): void {
    console.log('Selected user:', user);
    // Handle user selection logic here
  }
}