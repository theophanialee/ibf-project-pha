export interface AuthState {
  isAuthenticated: boolean;
  token?: string | null; // Optionally include token in state
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};
