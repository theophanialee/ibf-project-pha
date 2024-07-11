import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Listing } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private baseURL = 'http://localhost:8080/api/inventory';

  constructor(private httpClient: HttpClient) {}

  submitInventoryForm(inventoryData: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    const householdId = localStorage.getItem('selectedHouseholdId');
    const data = { ...inventoryData, userId, householdId };

    return this.httpClient.post<any>(`${this.baseURL}/add`, data).pipe(
      catchError((error) => {
        console.error('Error in submitInventoryForm:', error);
        throw error;
      })
    );
  }

  getListingsByHousehold(householdId: string): Observable<Listing[]> {
    return this.httpClient.get<Listing[]>(`${this.baseURL}/listings/${householdId}`);
  }

  deleteListing(listingId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${listingId}`);
  }
}
