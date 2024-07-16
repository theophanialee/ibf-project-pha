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