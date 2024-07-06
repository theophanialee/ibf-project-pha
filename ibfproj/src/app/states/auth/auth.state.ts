import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
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
