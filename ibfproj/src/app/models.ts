import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './states/auth/auth.state';

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
  auth: AuthState; // Define auth slice in your AppState
  // You can add other state slices here if needed
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  // Define other reducers here if needed
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