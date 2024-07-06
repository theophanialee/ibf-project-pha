import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const getProductState = createFeatureSelector<ProductState>('product');

export const getSelectedProduct = createSelector(
  getProductState,
  (state: ProductState) => state.selectedProduct
);
