import { createReducer, on } from '@ngrx/store';
import {
  createHouseholdSuccess,
  storeHouseholdId,
  storeSelectedHousehold,
} from './household.actions';
import { initialState } from './household.state';


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
