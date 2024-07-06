import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState {
  selectedProduct: any;
}

export const initialState: ProductState = {
  selectedProduct: null,
};

export const getProductState = createFeatureSelector<ProductState>('product');

export const getSelectedProduct = createSelector(
  getProductState,
  (state: ProductState) => state.selectedProduct
);
