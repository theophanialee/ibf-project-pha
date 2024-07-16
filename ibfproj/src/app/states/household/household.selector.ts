import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HouseholdState } from './household.state';

const selectHouseholdState = createFeatureSelector<HouseholdState>('household');

export const selectSelectedHousehold = createSelector(
  selectHouseholdState,
  (state: HouseholdState) => state.selectedHousehold
);
