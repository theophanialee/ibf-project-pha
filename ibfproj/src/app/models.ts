import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducers';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  isExist: boolean;
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

export interface ProductDetailsList {
  foodId: string;
  label: string;
  image: string;
  brand: string;
  servingSizes: {
    label: string;
    weight: number;
  }[];
}
