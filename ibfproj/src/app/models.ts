import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './states/auth/auth.state';
import {
  householdReducer,
  HouseholdState,
} from './states/household/household.reducer';
import { productReducer } from './states/product/product.reducer';
import { ProductState } from './states/product/product.state';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  isExist: boolean;
  userId: string;
  kitchenkakisJWT: string;
}

export interface AppState {
  auth: AuthState;
  household: HouseholdState;
  product: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  household: householdReducer,
  product: productReducer,
};

export interface ProductDetails {
  foodId: string;
  label: string;
  image: string;
  brand: string;
  servingSizeWeight: number; // Single serving size weight
}

export interface Household {
  householdId: string;
  name: string;
  description: string;
  lastEdited: Date;
}