import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Listing } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css',
})
export class InventoryListComponent {
  inventoryList: Listing[] = [];

  constructor(private inventorySvc: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.fetchInventoryList();
  }

  fetchInventoryList(): void {
    const householdId = localStorage.getItem('selectedHouseholdId');

    if (householdId != null)
      this.inventorySvc.getListingsByHousehold(householdId).subscribe(
        (data: Listing[]) => {
          this.inventoryList = data;
        },
        (error) => {
          console.error('Error fetching inventory:', error);
        }
      );
  }

  deleteListing(listingId: string): void {
    this.inventorySvc.deleteListing(listingId).subscribe(
      () => {
        this.inventoryList = this.inventoryList.filter(
          (listing) => listing.listingId !== listingId
        );
      },
      (error) => {
        console.error('Error deleting listing:', error);
      }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}