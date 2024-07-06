import { createAction, props } from '@ngrx/store';
import { ProductDetails } from '../../models';

// Action to set the selected product
export const setSelectedProduct = createAction(
  '[Product] Set Selected Product',
  props<{ product: ProductDetails }>()
);

// Action to clear the selected product
export const clearSelectedProduct = createAction(
  '[Product] Clear Selected Product'
);

// Additional actions as needed
