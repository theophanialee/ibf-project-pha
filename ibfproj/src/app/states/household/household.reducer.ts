import { Action, createReducer, on } from '@ngrx/store';
import { createHousehold, createHouseholdSuccess } from './household.actions';
import { Household } from '../../models';

export interface HouseholdState {
  households: Household[];
}

export const initialState: HouseholdState = {
  households: [],
};

export const householdReducer = createReducer(
  initialState,
  on(createHouseholdSuccess, (state, { household }) => ({
    ...state,
    households: [...state.households, household],
  }))
);
