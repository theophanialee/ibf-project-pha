import { ProductDetails } from '../../models';

export interface ProductState {
  selectedProduct: ProductDetails | null;
}

export const initialState: ProductState = {
  selectedProduct: null,
};
