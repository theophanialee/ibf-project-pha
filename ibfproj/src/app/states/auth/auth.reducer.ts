import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { token }) => ({
    ...state,
    isAuthenticated: !!token,
    token,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    token: null,
  }))
);