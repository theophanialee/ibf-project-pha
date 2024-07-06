import { createAction, props } from '@ngrx/store';

export const setSelectedProduct = createAction(
  '[Product] Set Selected Product',
  props<{ product: any }>()
);

export const clearSelectedProduct = createAction(
  '[Product] Clear Selected Product'
);
