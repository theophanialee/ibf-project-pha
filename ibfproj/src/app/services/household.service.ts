import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppState, Household } from '../models';
import { Store } from '@ngrx/store';
import { JwtauthService } from './jwtauth.service';
import { storeHouseholdId } from '../states/household/household.actions';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private baseURL = 'http://localhost:8080/api/household';

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private jwtAuthSvc: JwtauthService
  ) {}

  createHousehold(household: Household): Observable<Household> {
    const userId = this.jwtAuthSvc.getUserId();
    return this.httpClient
      .post<Household>(`${this.baseURL}/add`, {
        ...household,
        userId,
      })
      .pipe(
        tap((createdHousehold) => {
          this.store.dispatch(
            storeHouseholdId({ householdId: createdHousehold.householdId })
          );
        })
      );
  }

  getHouseholdsByUserId(userId: string): Observable<Household[]> {
    console.log('Get household for: ', userId);

    return this.httpClient.get<Household[]>(`${this.baseURL}/get/${userId}`);
  }

  updateHousehold(
    householdId: string,
    household: Household
  ): Observable<Household> {
    console.log('Update hosehold', household);

    return this.httpClient.put<Household>(
      `${this.baseURL}/update/${householdId}`,
      household
    );
  }
}
