import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  //placeholder
  ingredients = ['Tomato', 'Onion', 'Garlic', 'Carrot', 'Potato'];
  servings = [1, 2, 3, 4, 5];
  servingSizes = [1, 2, 3, 4, 5];
  units = [
    { name: 'grams', abbreviation: 'g' },
    { name: 'ounces', abbreviation: 'oz' },
    { name: 'cups', abbreviation: 'cups' },
    { name: 'tablespoons', abbreviation: 'tbsp' },
    { name: 'teaspoons', abbreviation: 'tsp' },
  ];
}
