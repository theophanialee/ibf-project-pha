import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AppState, ExistingUser, Household } from '../models';
import { Store } from '@ngrx/store';
import { JwtauthService } from './jwtauth.service';
import { storeHouseholdId } from '../states/household/household.actions';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private baseURL = `${environment.backendURL}/household`;

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

  getHouseholdDetailsByHHId(householdId: string): Observable<Household | null> {
    return this.httpClient.get<Household>(`${this.baseURL}/${householdId}`);
  }

  searchUsers(username: string): Observable<ExistingUser[] | null> {
    return this.httpClient
      .get<ExistingUser[]>(`${this.baseURL}/members/${username}`)
      .pipe(
        map((response) => (Array.isArray(response) ? response : [response]))
      );
  }

  addMemberToHousehold(
    householdId: string,
    user: ExistingUser
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.baseURL}/members/add/${householdId}`,
      user
    );
  }

  getAllMembersByHHId(householdId: string): Observable<ExistingUser[]> {
    return this.httpClient.get<ExistingUser[]>(
      `${this.baseURL}/members/${householdId}`
    );
  }
}
