import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Household } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private baseURL = 'http://localhost:8080/api/household';

  constructor(private http: HttpClient) {}

  createHousehold(household: Household): Observable<Household> {
    return this.http.post<Household>(`${this.baseURL}/add`, household);
  }
}
