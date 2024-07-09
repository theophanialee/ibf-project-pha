import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null; // Assuming userId is a string
}

export const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};
export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state, { token }) => ({
    ...state,
    isAuthenticated: true,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
  }))
);
