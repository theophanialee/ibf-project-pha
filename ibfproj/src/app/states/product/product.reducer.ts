import { createReducer, on } from '@ngrx/store';
import { initialState, ProductState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
  initialState,

  on(ProductActions.setSelectedProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  })),

  on(ProductActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProduct: null,
  }))

  // Add more reducers as needed
);

export function reducer(state: ProductState | undefined, action: any) {
  return productReducer(state, action);
}
