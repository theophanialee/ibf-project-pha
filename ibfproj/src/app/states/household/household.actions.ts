import { createAction, props } from '@ngrx/store';
import { Household } from '../../models';

export const createHousehold = createAction(
  '[Household] Create Household',
  props<{ household: Household }>()
);

export const createHouseholdSuccess = createAction(
  '[Household] Create Household Success',
  props<{ household: Household }>()
);

export const createHouseholdFailure = createAction(
  '[Household] Create Household Failure',
  props<{ error: any }>()
);
