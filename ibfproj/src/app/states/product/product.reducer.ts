import { Action, createReducer, on } from '@ngrx/store';
import { initialState, ProductState } from './product.state';
import { clearSelectedProduct, setSelectedProduct } from './product.action';

const _productReducer = createReducer(
  initialState,
  on(setSelectedProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  })),
  on(clearSelectedProduct, (state) => ({ ...state, selectedProduct: null }))
);

export function productReducer(
  state: ProductState | undefined,
  action: Action
) {
  return _productReducer(state, action);
}
