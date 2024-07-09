import { createReducer, on } from '@ngrx/store';
import { createHouseholdSuccess, storeHouseholdId } from './household.actions';
import { Household } from '../../models';

export interface HouseholdState {
  households: Household[];
  selectedHouseholdId: string | null;
}

export const initialState: HouseholdState = {
  households: [],
  selectedHouseholdId: null,
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
  }))
);
