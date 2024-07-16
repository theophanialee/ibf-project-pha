import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Household, Listing, Recipe } from '../models';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { HouseholdState } from '../states/household/household.state';
import * as fromHousehold from '../states/household/household.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  inventoryList: Listing[] = [];
  household$!: Observable<Household | null>;
  recipeSuggestions: Recipe[] = [];

  constructor(
    private inventorySvc: InventoryService,
    private store: Store<HouseholdState>
  ) {}

  ngOnInit(): void {
    this.fetchInventoryList();
    this.fetchHousehold();
    this.loadRecipeSuggestions();
  }

  fetchInventoryList(): void {
    const householdId = localStorage.getItem('selectedHouseholdId');

    if (householdId != null) {
      this.inventorySvc.getListingsByHousehold(householdId).subscribe(
        (data: Listing[]) => {
          // Sort by expiry date
          this.inventoryList = data.sort((a, b) => {
            return (
              new Date(a.expiryDate).getTime() -
              new Date(b.expiryDate).getTime()
            );
          });
        },
        (error) => {
          console.error('Error fetching inventory:', error);
        }
      );
    }
  }

  fetchHousehold(): void {
    this.household$ = this.store.pipe(
      select(fromHousehold.selectSelectedHousehold)
    );
  }

  loadRecipeSuggestions(): void {
    // Placeholders
    this.recipeSuggestions = [
      {
        title: 'Strawberry Smoothie',
        description:
          'Refreshing smoothie made with fresh strawberries and yogurt',
        prepTime: '5 minutes',
        cookTime: '0 minutes',
        servings: 2,
      },
      {
        title: 'Banana Bread',
        description: 'Moist and delicious banana bread made with ripe bananas',
        prepTime: '15 minutes',
        cookTime: '1 hour',
        servings: 8,
      },
      {
        title: 'Pasta Carbonara',
        description: 'Classic Italian pasta dish with creamy sauce and bacon',
        prepTime: '15 minutes',
        cookTime: '20 minutes',
        servings: 4,
      },
      {
        title: 'Chicken Stir Fry',
        description:
          'Healthy stir fry with tender chicken and fresh vegetables',
        prepTime: '10 minutes',
        cookTime: '15 minutes',
        servings: 3,
      },
      {
        title: 'Vegetarian Chili',
        description: 'Hearty chili made with beans, tomatoes, and spices',
        prepTime: '20 minutes',
        cookTime: '30 minutes',
        servings: 6,
      },
      // Add more recipes as needed
    ];
  }
}