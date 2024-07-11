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

export const storeHouseholdId = createAction(
  '[Household] Store Household ID',
  props<{ householdId: string }>()
);

export const storeSelectedHousehold = createAction(
  '[Household] Store Selected Household',
  props<{ household: Household }>()
);

export const updateHousehold = createAction(
  '[Household] Update Household',
  props<{ household: Household }>()
);