import { createReducer, on } from '@ngrx/store';
import {
  createHouseholdSuccess,
  storeHouseholdId,
  storeSelectedHousehold,
} from './household.actions';
import { Household } from '../../models';

export interface HouseholdState {
  households: Household[];
  selectedHouseholdId: string | null;
  selectedHousehold: Household | null;
}

export const initialState: HouseholdState = {
  households: [],
  selectedHouseholdId: null,
  selectedHousehold: null,
};

export const householdReducer = createReducer(
  initialState,
  on(createHouseholdSuccess, (state, { household }) => ({
    ...state,
    households: [...state.households, household],
  })),
  on(storeHouseholdId, (state, { householdId }) => ({
    ...state,
    selectedHouseholdId: householdId,
  })),
  on(storeSelectedHousehold, (state, { household }) => ({
    ...state,
    selectedHousehold: household,
  }))
);
