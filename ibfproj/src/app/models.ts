import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from './states/auth/auth.state';
import { householdReducer } from './states/household/household.reducer';
import { productReducer } from './states/product/product.reducer';
import { ProductState } from './states/product/product.state';
import { authReducer } from './states/auth/auth.reducer';
import { HouseholdState } from './states/household/household.state';

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

//Receive back
export interface Listing {
  listingId: string;
  userId: string;
  householdId: string;
  label: string;
  brand: string;
  servingSizeWeight: number;
  servings: number;
  expiryDate: Date;
  lastEdited: Date;
}

export interface ExistingUser {
  userId: string;
  username: string;
  email: string;
}

export interface ChatMessage {
  username: string;
  content: string;
}

export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
}